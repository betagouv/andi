SQL_POSITION = """
    UPDATE "entreprises"
    SET
        numero = %(numero)s,
        rue = %(rue)s,
        commune = %(commune)s,
        region = %(region)s,
        departement = %(departement)s,
        postal_code = %(postal_code)s,
        lat = %(lat)s,
        lon = %(lon)s,
        nic_siege = %(nic_siege)s,
        geo_type = %(geo_type)s,
        geo_score = %(geo_score)s,
        geo_addr = %(geo_addr)s,
        geo_id = %(geo_id)s,
        data_majdate = %(data_majdate)s,

        flags = ARRAY_APPEND(flags, 'cquest_geo_041219'),
        date_updated = now()
    WHERE siret = %(siret)s
    AND NOT flags @> ARRAY['cquest_geo_041219'];
"""


def exec_row(cur, data_row, dry_run=False):
    if not dry_run:
        cur.execute(sql_update(cur, data_row))
    else:
        sqls = [sql_update(cur, data_row)]
        print("Dry run results:")
        for sql in sqls:
            print(sql.decode('utf8'))

    d = data_row
    return f"{d.get('siren')} / {d.get('geo_addr')}"


def sql_update(cur, d):
    siret = ''.join([d.get('siren'), d.get('nic')])
    data = {
        'siret': siret,
        'numero': d.get('numvoie'),
        'rue': d.get('libvoie'),
        'commune': d.get('libcom'),
        'departement': d.get('depet'),
        'postal_code': d.get('codpos'),
        'region': d.get('libreg'),
        'nic_siege': d.get('nicsiege'),
        'lat': d.get('latitude', 0) if d.get('latitude') != '' else 0,
        'lon': d.get('longitude', 0) if d.get('longitude') != '' else 0,
        'geo_type': d.get('geotype'),
        'geo_score': d.get('geoscore'),
        'geo_addr': d.get('geoadresse'),
        'geo_id': d.get('geoid'),
        'data_majdate': d.get('datemaj'),

    }
    return cur.mogrify(SQL_POSITION, data)
