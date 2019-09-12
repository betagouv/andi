import re

SQL_COMPANY = """
    UPDATE "company"
    SET
        pmsmp_interest = %(pmsmp_interest)s,
        pmsmp_count_recent = %(pmsmp_count_recent)s,
        rome_offers = %(rome_offers)s,
        flags = array_append(flags, 'pole_emploi_updated'),
        date_updated = now()
    WHERE siret = %(siret)s
    RETURNING id_internal
"""

SQL_CONTACT = """
    UPDATE "company_contact"
    SET
        postal_person = %(postal_person)s,
        phone_preferred_1 = %(phone_preferred_1)s,
        phone_preferred_2 = %(phone_preferred_2)s,
        phone_official_1 = %(phone_official_1)s,
        phone_official_2 = %(phone_official_2)s,
        email_preferred = %(email_preferred)s,
        email_official = %(email_official)s,
        date_updated = now()
    WHERE id_company = %(id_company)s
"""


def exec_row(cur, data_row):
    cur.execute(sql_company(cur, data_row))
    (cid,) = cur.fetchone()
    sqls = [
        sql_contact(cur, cid, data_row).decode('ascii'),
    ]
    cur.execute(';'.join(sqls))
    d = data_row
    return f"{cid}: {d.get('raison_sociale')} / {d.get('enseigne')}"


def sql_company(cur, d):
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
        'pmsmp_interest': "OUI" in d.get('volontaire_pmsmp', ''),
        'pmsmp_count_recent': int(d.get('nb_pmsmp_24_mois')),
        'rome_offers': rome_list,
        'flags': [],
    }
    return cur.mogrify(SQL_COMPANY, data)


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
