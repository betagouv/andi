#!/usr/bin/env python3
import logging
import sys
import re
import psycopg2
import yaml
import json

import click

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('DEBUG'))
logger.addHandler(logging.StreamHandler())

SQL_COMPANY = """
INSERT INTO "company" (
    nom,
    enseigne,
    siren,
    nic,
    siret,
    naf,
    macro_sector,
    taille,
    pmsmp_interest,
    pmsmp_count_recent,
    rome_offers,
    source,
    import_tag,
    flags
)
VALUES (
    %(nom)s,
    %(enseigne)s,
    %(siren)s,
    %(nic)s,
    %(siret)s,
    %(naf)s,
    %(macro_sector)s,
    %(taille)s,
    %(pmsmp_interest)s,
    %(pmsmp_count_recent)s,
    %(rome_offers)s,
    %(source)s,
    %(import_tag)s,
    %(flags)s
)
RETURNING id_internal
"""

SQL_POSITION = """
    INSERT INTO "company_position" (
    id_company,
    commune
)
VALUES (
    %(id_company)s,
    %(commune)s
)
"""

SQL_CONTACT = """
    INSERT INTO "company_contact" (
    id_company,
    addr,
    postal_code,
    postal_commune,
    postal_person,
    phone_preferred_1,
    phone_preferred_2,
    phone_official_1,
    phone_official_2,
    email_preferred,
    email_official
)
VALUES (
    %(id_company)s,
    %(addr)s,
    %(postal_code)s,
    %(postal_commune)s,
    %(postal_person)s,
    %(phone_preferred_1)s,
    %(phone_preferred_2)s,
    %(phone_official_1)s,
    %(phone_official_2)s,
    %(email_preferred)s,
    %(email_official)s
)
"""


def write_company(cur, d):
    # Get size
    match = re.match("(\d{3}) A (\d{3})", d.get('tranche_deffectif_de_lentreprise'))
    if match:
        taille = f'{match[1]}-{match[2]}'
    elif d.get('tranche_deffectif_de_lentreprise').startswith('10000'):
        taille = '+10000'
    else:
        taille = '0'

    # Get romes
    if d.get('rome_offres_deposees_12_mois'):
        rome_list = d.get('rome_offres_deposees_12_mois').split(';')
        rome_list = [v.strip() for v in rome_list]
        rome_list = [v for v in rome_list if v != '...']
    else:
        rome_list = []

    # continue
    data = {
        'nom': d.get('raison_sociale'),
        'enseigne': d.get('enseigne'),
        'siren': d.get('siret')[0:9],
        'nic': d.get('siret')[9:14],
        'siret': d.get('siret'),
        'naf': d.get('naf'),
        'macro_sector': d.get('macro_secteur'),
        'taille': taille,
        'pmsmp_interest': "OUI" in d.get('volontaire_pmsmp', ''),
        'pmsmp_count_recent': int(d.get('nb_pmsmp_24_mois')),
        'rome_offers': rome_list,
        'source': 'csv_26k_pole_emploi',
        'import_tag': 'csv_26k',
        'flags': [],
    }
    cur.execute(SQL_COMPANY, data)
    (cid,) = cur.fetchone()
    return cid


def write_position(cur, cid, d):
    data = {
        'id_company': cid,
        'commune': d.get('commune_etab')
    }
    cur.execute(SQL_POSITION, data)
    return True

def write_contact(cur, cid, d):
    addr_fields = ['adresse_compl', 'adresse_compl_2', 'adresse_principale', 'distribution_specifique']
    addr_raw = [val for key, val in d.items() if key in addr_fields and val != '']
    data = {
        'id_company': cid,
        'addr': addr_raw,
        'postal_code': d.get('code_postal'),
        'postal_commune': d.get('commune_acheminement_postal'),
        'postal_person': d.get('nom_prenom_correspondant_privilegie'),
        'phone_preferred_1': d.get('telephone_1_correspondant_privilegie'),
        'phone_preferred_2': d.get('telephone_2_correspondant_privilegie'),
        'phone_official_1': d.get('tel_1_etablissement_particulier'),
        'phone_official_2': d.get('tel_2_etablissement_particulier'),
        'email_preferred': d.get('mail_correspondant_privilegie'),
        'email_official': d.get('mail_adresse_principale'),
    }
    cur.execute(SQL_CONTACT, data)
    return True

def cfg_get(config):
    def_config_file = open('config_default.yaml', 'r')
    opt_config_file = None if not config else open(config, 'r')
    def_config = yaml.safe_load(def_config_file)
    config = {} if not config else yaml.safe_load(opt_config_file)
    return {**def_config, **config}

# #################################################################### MAIN FLOW
# ##############################################################################
@click.command()
@click.option('--config_file', default=None)
def main(config_file):
    """
    Get json line by line, write to enterpise database
    Reads from stdin (pipe)
    """
    cfg = cfg_get(config_file)
    logging.debug('Config:\n%s', json.dumps(cfg, indent=2))
    logger.info('Starting import of csv data')
    count_success = 0
    count_error = 0
    with psycopg2.connect(**cfg['postgresql']) as conn, conn.cursor() as cur:
        for line in sys.stdin:
            try:
                record = json.loads(line)
                cid = write_company(cur, record)
                write_position(cur, cid, record)
                write_contact(cur, cid, record)
                logger.debug(
                    'Wrote record for %s: %s/%s',
                    cid,
                    record.get('raison_sociale'),
                    record.get('enseigne')
                )
                count_success += 1
            except Exception as e:
                logger.exception(e)
                count_error += 1
    logger.info(
        'Ended import of csv data, %s records written, %s failed',
        count_success,
        count_error
    )


if __name__ == '__main__':
    main()
