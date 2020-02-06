import logging

logger = logging.getLogger(__name__)
logger.addHandler(logging.StreamHandler())

SQL_UPDATE = """
    UPDATE "entreprises"
    SET
        pmsmp_interest = %(pmsmp_interest)s,
        pmsmp_count_recent = %(pmsmp_count_recent)s,
        flags = array_append(flags, 'pmsmp_poleemploi'),
        phone_official_1 = %(phone_official_1)s,
        phone_official_2 = %(phone_official_2)s,
        email_official = %(email_official)s,
        contact_1_phone = %(phone_preferred_1)s,
        contact_2_phone = %(phone_preferred_2)s,
        contact_1_name = %(postal_person)s,
        contact_1_mail = %(email_preferred)s,
        date_updated = now()
    WHERE id_internal = %(id_internal)s
    RETURNING id_internal
"""


def exec_row(cur, data_row, dry_run=False):
    (success, cid) = check_company(cur, data_row)
    if not success:
        return f'Failed to update company {data_row.get("siret")}'

    if not dry_run:
        cur.execute(sql_company(cur, cid, data_row))
    else:
        sqls = [
            sql_company(cur, cid, data_row)
        ]
        print("Dry run results:")
        for sql in sqls:
            print(sql.decode('utf8'))

    d = data_row
    return f"{cid}: {d.get('raison_sociale')} / {d.get('enseigne')}"


def check_company(cur, d):
    siret = d.get('siret')
    siren = d.get('siret')[0:9]
    cur.execute('SELECT id_internal FROM entreprises WHERE siret = %s;', (siret, ))
    results = cur.fetchall()
    if len(results) != 1:
        logger.warning('siret %s: %s rows found, trying siren', siret, cur.rowcount)
        cur.execute('SELECT id_internal, siret FROM entreprises WHERE siren = %s;', (siren, ))
        if cur.rowcount == 0:
            logger.critical('Failed to find siren %s (siret %s)', siren, siret)
            return (False, None)
        if cur.rowcount > 3:
            logger.critical(
                'Too many results (%s) for siren %s (siret %s)',
                cur.rowcount,
                siren,
                siret
            )
            return (False, None)
        ids = [(k[0], k[1]) for k in cur.fetchall()]
        logger.info(
            'siren %s: %s rows found, using id %s / siret %s',
            siren,
            cur.rowcount,
            ids[0][0],
            ids[0][1])
        return_id = ids[0][0]
    else:
        return_id = results[0]

    return (True, return_id)


def sql_company(cur, cid, d):
    data = {
        'id_internal': cid,
        'pmsmp_interest': "OUI" in d.get('volontaire_pmsmp', ''),
        'pmsmp_count_recent': int(d.get('nb_pmsmp_24_mois')),
        'postal_person': d.get('nom_prenom_correspondant_privilegie'),
        'phone_preferred_1': d.get('telephone_1_correspondant_privilegie'),
        'phone_preferred_2': d.get('telephone_2_correspondant_privilegie'),
        'phone_official_1': d.get('tel_1_etablissement_particulier'),
        'phone_official_2': d.get('tel_2_etablissement_particulier'),
        'email_preferred': d.get('mail_correspondant_privilegie'),
        'email_official': d.get('mail_adresse_principale'),
    }
    return cur.mogrify(SQL_UPDATE, data)
