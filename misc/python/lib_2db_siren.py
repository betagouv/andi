from misc_data import NAF_DIVISIONS, SIRENE_EFFECTIF_TO_SIZE

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
    postal_commune
)
VALUES (
    %(id_company)s,
    %(addr)s,
    %(postal_code)s,
    %(postal_commune)s
)
"""


def exec_row(cur, data_row, dry_run=False):
    if not dry_run:
        cur.execute(sql_company(cur, data_row))
        (cid,) = cur.fetchone()
        sqls = [
            sql_position(cur, cid, data_row),
            sql_contact(cur, cid, data_row)
        ]
        [cur.execute(sql) for sql in sqls]
    else:
        cid = "test"
        sqls = [
            sql_company(cur, data_row),
            sql_position(cur, cid, data_row),
            sql_contact(cur, cid, data_row),
        ]
        print("Dry run results:")
        for sql in sqls:
            print(sql.decode('utf8'))

    d = data_row
    return f"{cid}: {d.get('denominationunitelegale')} / {d.get('enseigne1etablissement')}"


def sql_company(cur, d):
    # Get size
    taille = SIRENE_EFFECTIF_TO_SIZE.get(d.get('trancheeffectifsetablissement'))
    rome_list = []
    macro_domain = NAF_DIVISIONS.get(d.get('activiteprincipaleetablissement')[0:2])

    # continue
    data = {
        'nom': d.get('denominationunitelegale'),
        'enseigne': d.get('enseigne1etablissement'),
        'siren': d.get('siren'),
        'nic': d.get('nic'),
        'siret': d.get('siret'),
        'naf': d.get('activiteprincipaleetablissement').replace('.', ''),
        'macro_sector': macro_domain,
        'taille': taille,
        'pmsmp_interest': False,
        'pmsmp_count_recent': 0,
        'rome_offers': rome_list,
        'source': 'insee_sirene',
        'import_tag': 'csv_sirene_95',
        'flags': [],
    }
    return cur.mogrify(SQL_COMPANY, data)


def sql_position(cur, cid, d):
    data = {
        'id_company': cid,
        'commune': d.get('libellecommuneetablissement')
    }
    return cur.mogrify(SQL_POSITION, data)


def sql_contact(cur, cid, d):
    addr_raw = [
        d.get('complementadresseetablissement'),
        ''.join([d.get('numerovoieetablissement'), d.get('indicerepetitionetablissement')]),
        d.get('typevoieetablissement'),
        d.get('libellevoieetablissement'),
        d.get('distributionspecialeetablissement'),

    ]
    addr = [f for f in addr_raw if f]
    data = {
        'id_company': cid,
        'addr': addr,
        'postal_code': d.get('codecommuneetablissement'),
        'postal_commune': d.get('libellecommuneetablissement'),
    }
    return cur.mogrify(SQL_CONTACT, data)
