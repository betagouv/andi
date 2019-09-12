SQL_POSITION = """
    UPDATE "company_position"
    SET
        label = %(label)s,
        numero = %(numero)s,
        rue = %(rue)s,
        quartier = %(quartier)s,
        commune = %(commune)s,
        region = %(region)s,
        departement = %(departement)s,
        lat = %(lat)s,
        lon = %(lon)s,
        postal_code = %(postal_code)s,
        data_quality = 'excellent',
        date_updated = now()
    WHERE id_company = %(id_company)s
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
    return f"{d.get('recid')} / {d.get('county')}"


def sql_update(cur, d):
    data = {
        'id_company': d.get('recid'),
        'label': d.get('locationlabel'),
        'numero': d.get('housenumber'),
        'rue': d.get('street'),
        'quartier': d.get('district'),
        'commune': d.get('city'),
        'departement': d.get('county'),
        'postal_code': d.get('postalcode'),
        'region': d.get('state'),
        'lat': d.get('displaylatitude'),
        'lon': d.get('displaylongitude'),
    }
    return cur.mogrify(SQL_POSITION, data)
