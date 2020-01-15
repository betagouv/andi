from misc_data import SIRENE_EFFECTIF_TO_SIZE
import logging

logger = logging.getLogger(__name__)

SQL_COMPANY = """
INSERT INTO "entreprises" (
    nom,                                    
    enseigne,
    siret,
    naf,
    siren,
    nic,
    taille,
    pmsmp_interest,
    pmsmp_count_recent,
    caractere_employeur,
    etat_actif,
    source,
    import_tag,
    flags,
    commune,
    addr,
    postal_code,
    commune_code,
    siege,
    enseignes,
    nic_siege,
    geo_addr,
    geo_id,
    geo_score,
    geo_type,
    lat,
    lon,
    geom
)
VALUES (
    %(nom)s,
    %(enseigne)s,
    %(siret)s,
    %(naf)s,
    %(siren)s,
    %(nic)s,
    %(taille)s,
    %(pmsmp_interest)s,
    %(pmsmp_count_recent)s,
    %(caractere_employeur)s,
    %(etat_actif)s,
    %(source)s,
    %(import_tag)s,
    %(flags)s,
    %(commune)s,
    %(addr)s,
    %(postal_code)s,
    %(commune_code)s,
    %(siege)s,
    %(enseignes)s,
    %(nic_siege)s,
    %(geo_addr)s,
    %(geo_id)s,
    %(geo_score)s,
    %(geo_type)s,
    %(lat)s,
    %(lon)s,
    ST_SetSRID(ST_MakePoint(%(lon)s, %(lat)s), 4326)
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

    enseignes_raw = [
        d.get('enseigne1etablissement'),
        d.get('enseigne2etablissement'),
        d.get('enseigne3etablissement'),
    ]
    enseignes = [f for f in enseignes_raw if f]

    # continue
    data = {
        'nom': d.get('denominationusuelleetablissement'),
        'enseigne': d.get('enseigne1etablissement'),
        'siret': d.get('siret'),
        'naf': d.get('activiteprincipaleetablissement').replace('.', ''),
        'siren': d.get('siren'),
        'nic': d.get('nic'),
        'taille': taille,
        'pmsmp_interest': False,
        'pmsmp_count_recent': 0,
        'caractere_employeur': d.get('caractereemployeuretablissement') != 'N',
        'etat_actif': d.get('etatadministratifetablissement') == 'A',
        'source': 'insee_sirene_geo_cquest',
        'import_tag': tag,
        'flags': [],
        'commune': d.get('libellecommuneetablissement'),
        'addr': addr,
        'postal_code': d.get('codepostaletablissement'),
        'commune_code': d.get('codecommuneetablissement'),
        'siege': d.get('etablissementsiege') == "true",
        'enseignes': enseignes,
        'nic_siege': d.get('nicsiege'),
        'geo_addr': d.get('geoadresse'),
        'geo_id': d.get('geoid'),
        'geo_type': d.get('geotype'),
        'geo_score': d.get('geoscore'),
        'lat': d.get('latitude', 0) if d.get('latitude') != '' else 0,
        'lon': d.get('longitude', 0) if d.get('longitude') != '' else 0,
    }

    return cur.mogrify(SQL_COMPANY, data)
