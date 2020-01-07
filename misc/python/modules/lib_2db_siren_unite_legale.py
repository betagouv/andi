SQL_POSITION = """
    UPDATE "entreprises"
    SET
        enseigne = %(denomination)s,
        enseignes = %(denominations)s,
        nom = %(denomination)s,
        flags = ARRAY_APPEND(flags, 'stock_unite_legale')
    WHERE siret = %(siret)s
    ;
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
    siret = ''.join([d.get('siren'), d.get('nicsiegeunitelegale')])

    nom = d.get('nomunitelegale')
    denomination = d.get('denominationunitelegale')

    if not denomination and nom:
        name = ' '.join([d.get('sexeunitelegale'), d.get('prenom1unitelegale'), d.get('nomunitelegale')])
    elif not denomination:
        print(f"No strong data: {d.get('siren')}")
    else:
        name = denomination

    data = {
        'siret': siret,
        'denomination': name,
        'denominations': [x for x in [
            d.get('denominationusuelle1unitelegale'),
            d.get('denominationusuelle2unitelegale'),
            d.get('denominationusuelle3unitelegale'),
        ] if x]

    }
    return cur.mogrify(SQL_POSITION, data)
