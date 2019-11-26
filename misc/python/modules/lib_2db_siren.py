from misc_data import SIRENE_EFFECTIF_TO_SIZE
import logging

logger = logging.getLogger(__name__)

SQL_COMPANY = """
INSERT INTO "entreprises" (
    nom,
    enseigne,
    siret,
    naf,
    taille,
    pmsmp_interest,
    pmsmp_count_recent,
    source,
    import_tag,
    flags,
    commune,
    addr,
    postal_code
)
VALUES (
    %(nom)s,
    %(enseigne)s,
    %(siret)s,
    %(naf)s,
    %(taille)s,
    %(pmsmp_interest)s,
    %(pmsmp_count_recent)s,
    %(source)s,
    %(import_tag)s,
    %(flags)s,
    %(commune)s,
    %(addr)s,
    %(postal_code)s
)
RETURNING id_internal
"""


def exec_row(cur, data_row, tag=False, dry_run=False):
    if not dry_run:
        cid = None
        cur.execute(sql_company(cur, data_row, tag))
        (cid,) = cur.fetchone()
        # sqls = [
        #     sql_position(cur, cid, data_row),
        #     sql_contact(cur, cid, data_row)
        # ]
        # [cur.execute(sql) for sql in sqls]
    else:
        cid = "test"
        sqls = [
            sql_company(cur, data_row, tag),
        ]
        print("Dry run results:")
        for sql in sqls:
            print(sql.decode('utf8'))

    d = data_row
    return f"{cid}: {d.get('denominationunitelegale')} / {d.get('enseigne1etablissement')}"


def sql_company(cur, d, tag):
    # Get size
    taille = SIRENE_EFFECTIF_TO_SIZE.get(d.get('trancheeffectifsetablissement'))

    addr_raw = [
        d.get('complementadresseetablissement'),
        ''.join([d.get('numerovoieetablissement'), d.get('indicerepetitionetablissement')]),
        d.get('typevoieetablissement'),
        d.get('libellevoieetablissement'),
        d.get('distributionspecialeetablissement'),
    ]
    addr = [f for f in addr_raw if f]

    # continue
    data = {
        'nom': d.get('denominationunitelegale'),
        'enseigne': d.get('enseigne1etablissement'),
        # 'siren': d.get('siren'),
        # 'nic': d.get('nic'),
        'siret': d.get('siret'),
        'naf': d.get('activiteprincipaleetablissement').replace('.', ''),
        'taille': taille,
        'pmsmp_interest': False,
        'pmsmp_count_recent': 0,
        'source': 'insee_sirene',
        'import_tag': tag,
        'flags': [],
        'commune': d.get('libellecommuneetablissement'),
        'addr': addr,
        'postal_code': d.get('codecommuneetablissement'),
    }

    return cur.mogrify(SQL_COMPANY, data)
