import os
import yaml
import logging
import psycopg2
import json
from collections import OrderedDict
from psycopg2.extras import RealDictCursor
from urllib.parse import quote_plus
from sql import MATCH_QUERY


logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('INFO'))
logger.addHandler(logging.StreamHandler())

MAX_VALUE_GROUP = '3'


# ##################################################################### HELPERS
# #############################################################################
def get_rome_defs(romes):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    out = {}
    for rome in romes:
        rome = rome.upper()
        if ':' in rome:
            rome, vgroup = rome.split(':')
        else:
            vgroup = MAX_VALUE_GROUP

        logger.debug('Loading definition for rome %s (value group: %s)', rome, vgroup)
        rome_path = f'{current_dir}/rome_defs/{rome}.yaml'
        try:
            with open(rome_path, 'r') as rome_file:
                out[rome] = yaml.safe_load(rome_file)
                out[rome]['value_group'] = vgroup
        except FileNotFoundError:
            logger.warning(
                'Definition for ROME %s not found (does file %s exist ?)',
                rome,
                rome_path
            )

    return out


def parse_rome_size_prefs(rome_defs, tpe, pme, eti, ge):
    base = OrderedDict([
        ('tpe', tpe),
        ('pme', pme),
        ('eti', eti),
        ('ge', ge)
    ])
    for rome, d in rome_defs.items():
        if 'preferred_size' in d and d['preferred_size'] is not None:
            logger.info('ROME %s preferred sizes: %s', rome, ', '.join(d['preferred_size']))
            for t in d['preferred_size']:
                base[t] = True if base[t] is None else base[t]

    base = {k: False if v is None else v for k, v in base.items()}

    return base.values()


def parse_naf_list(naf_defs, include=None, exclude=None):
    include = set() if not include else include
    exclude = set() if not exclude else exclude

    codes = {str(i): set() for i in range(1, int(MAX_VALUE_GROUP) + 1)}
    domains = {str(i): set() for i in range(1, int(MAX_VALUE_GROUP) + 1)}

    [codes[MAX_VALUE_GROUP].add(naf) for naf in include]

    def clean(l, n):
        if n in l:
            l.remove(n)

    for rome, d in naf_defs.items():
        vgroup = int(d['value_group'])
        if 'naf_domains_secondary' in d:
            for naf in d['naf_domains_secondary']:
                domains[str(vgroup - 1)].add(naf)
        if 'naf_domains_principal' in d:
            for naf in d['naf_domains_principal']:
                domains[str(vgroup)].add(naf)
        if 'naf_secondary' in d:
            for naf in d['naf_secondary']:
                codes[str(vgroup - 1)].add(naf)
        if 'naf_principal' in d:
            for naf in d['naf_principal']:
                codes[str(vgroup)].add(naf)

        if 'naf_of_interest' in d:
            for naf in d['naf_of_interest']:
                codes[str(vgroup)].add(naf)

    out_codes, out_domains = {}, {}
    done = set()
    for vgroup in reversed(range(1, int(MAX_VALUE_GROUP) + 1)):
        vg = str(vgroup)
        if vg in codes:
            for naf in codes[vg]:
                if naf not in done and naf not in exclude:
                    done.add(naf)
                    out_codes[naf] = vgroup
        if vg in domains:
            for dom in domains[vg]:
                if dom not in done:
                    done.add(dom)
                    out_domains[dom] = vgroup

    return out_codes, out_domains


def get_naf_sql(rules):
    '''
    '''
    codes, domains = rules
    sql = ['CASE company.naf']
    for naf, value in codes.items():
        sql.append(f'WHEN \'{naf}\' THEN {value}')

    if domains:
        sql.append('ELSE CASE substring(company.naf, 0, 3)')
        for naf, value in domains.items():
            value -= 1
            sql.append(f'WHEN \'{naf}\' THEN {value}')

    sql.append('ELSE 1')

    if domains:
        sql.append('END')

    sql.append('END AS score')

    return "\n".join(sql)


def sub_maxvg(vg, num):
    if num >= int(vg):
        return '1'
    return str(int(vg) - num)


def get_size_rules(tpe, pme, eti, ge):
    # < 10 pers
    tpe_def = {
        '1-2': 0,
        '3-5': 0,
        '6-9': 0,
        '10-19': 1,
        '20-49': 1,
        '50-99': 1,
        '100-199': 2,
        '200-249': 2,
        '250-499': 3,
        '500-999': 4,
        '1000-1999': 5,
        '2000-4999': 6,
        '5000-9999': 7,
        '+10000': 8
    }
    # 10-249 pers
    pme_def = {
        '1-2': 3,
        '3-5': 2,
        '6-9': 1,
        '10-19': 0,
        '20-49': 0,
        '50-99': 0,
        '100-199': 0,
        '200-249': 0,
        '250-499': 1,
        '500-999': 1,
        '1000-1999': 2,
        '2000-4999': 3,
        '5000-9999': 4,
        '+10000': 5
    }
    # 250-4999 pers
    eti_def = {
        '1-2': 5,
        '3-5': 4,
        '6-9': 3,
        '10-19': 3,
        '20-49': 2,
        '50-99': 2,
        '100-199': 1,
        '200-249': 1,
        '250-499': 0,
        '500-999': 0,
        '1000-1999': 0,
        '2000-4999': 0,
        '5000-9999': 1,
        '+10000': 2
    }
    # > 5000 pers
    ge_def = {
        '1-2': 9,
        '3-5': 9,
        '6-9': 8,
        '10-19': 7,
        '20-49': 6,
        '50-99': 5,
        '100-199': 4,
        '200-249': 3,
        '250-499': 2,
        '500-999': 2,
        '1000-1999': 1,
        '2000-4999': 1,
        '5000-9999': 0,
        '+10000': 0
    }
    keys = ['1-2', '3-5', '6-9', '10-19', '20-49',
            '50-99', '100-199', '200-249', '250-499',
            '500-999', '1000-1999', '2000-4999',
            '5000-9999', '+10000']
    root = {k: int(MAX_VALUE_GROUP) for k in keys}

    loop = [(tpe, tpe_def), (pme, pme_def), (eti, eti_def), (ge, ge_def)]
    for (check, definition) in loop:
        if not check:
            continue
        for k, v in definition.items():
            root[k] = v if root[k] > v else root[k]

    root = {k: sub_maxvg(MAX_VALUE_GROUP, v) for k, v in root.items()}

    sql = ['CASE company.taille']
    for k, v in root.items():
        sql.append(f'WHEN \'{k}\' THEN {v}')

    sql.append('ELSE 1')
    sql.append('END AS score')

    return "\n".join(sql)


# ####################################################################### MATCH
# #############################################################################
def run_profile(cfg, lat, lon, max_distance, romes, includes, excludes, sizes, *args, **kwargs):
    if max_distance == '':
        max_distance = 10

    naf_def = get_rome_defs(romes)
    logger.debug('Naf matching definitions:\n%s', json.dumps(naf_def, indent=2))

    naf_rules = parse_naf_list(naf_def, includes, excludes)
    logger.debug('Naf matching rules:\n%s', json.dumps(naf_rules, indent=2))

    naf_sql = get_naf_sql(naf_rules)
    logger.debug('Naf sql:\n%s', naf_sql)

    tpe, pme, eti, ge = parse_rome_size_prefs(
        naf_def,
        'tpe' in sizes,
        'pme' in sizes,
        'eti' in sizes,
        'ge' in sizes)

    logger.info(
        'Parsed sizes: tpe: %s, pme: %s, eti: %s, ge: %s',
        tpe,
        pme,
        eti,
        ge
    )

    size_sql = get_size_rules(tpe, pme, eti, ge)
    logger.debug('Size rules:\n%s', size_sql)

    result = {}
    logger.info('Connecting to database ...')
    with psycopg2.connect(cursor_factory=RealDictCursor, **cfg['postgresql']) as conn, conn.cursor() as cur:
        logger.info('Obtained database cursor')
        data = {
            'lat': lat,
            'lon': lon,
            'dist': max_distance
        }
        sql = cur.mogrify(MATCH_QUERY.format(
            naf_rules=naf_sql,
            size_rules=size_sql,
            limit_test=f'LIMIT {cfg["limit"]}' if 'limit' in cfg else ''
        ), data)
        logger.debug(sql.decode('utf8'))
        cur.execute(sql)
        result = cur.fetchall()

    for row in result:
        # row['google_url'] = ''.join(['https://google.fr/search?q=', quote_plus(row['nom']), quote_plus(row['departement'])])
        row['google_search'] = ''.join([
            'https://google.fr/search?q=',
            quote_plus(row['nom'].lower()),
            '+',
            quote_plus(str(row['departement'])),
            '+',
            quote_plus(str(row['commune'])),
        ])

    return result
