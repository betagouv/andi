import re
import logging

logger = logging.getLogger(__name__)
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


def exec_row(cur, d, dry_run=False):
    if not check_company(cur, d):
        return f"Skipped {d.get('siret')} / {d.get('raison_sociale')}: already known"
    if not dry_run:
        cur.execute(sql_company(cur, d))
        (cid,) = cur.fetchone()
        sqls = [
            sql_position(cur, cid, d).decode('utf8'),
            sql_contact(cur, cid, d).decode('utf8')
        ]
        cur.execute(';'.join(sqls))
    else:
        cid = 'test_id'
        sqls = [
            sql_company(cur, d),
            sql_position(cur, cid, d),
            sql_contact(cur, cid, d),
        ]
        print("Dry run results:")
        for sql in sqls:
            print(sql.decode('utf8'))

    return f"{cid}: {d.get('raison_sociale')} / {d.get('enseigne')}"

def check_company(cur, d):
    siret = d.get('siret')
    cur.execute( 'SELECT id_internal FROM company WHERE siret = %s;', (siret, ))
    results = cur.fetchall()
    if len(results) != 0:
        return False
    return True

def sql_company(cur, d):
    # Get size
    match = re.match(
        r'(\d{3}) A (\d{3})',
        d.get('tranche_effectif_insee')
    )
    if match:
        taille = f'{match[1]}-{match[2]}'
    elif d.get('tranche_effectif_insee').startswith('10000'):
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
        'source': 'pe_pmsmp_files',
        'import_tag': 'pmsmp_unknown_siret',
        'flags': [],
    }
    return cur.mogrify(SQL_COMPANY, data)


def sql_position(cur, cid, d):
    data = {
        'id_company': cid,
        'commune': d.get('commune_etab')
    }
    return cur.mogrify(SQL_POSITION, data)


def sql_contact(cur, cid, d):
    fields = [
        'adresse_compl',
        'adresse_compl_2',
        'adresse_principale',
        'distribution_specifique'
    ]
    addr_raw = [val for key, val in d.items() if key in fields and val != '']
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
    return cur.mogrify(SQL_CONTACT, data)
