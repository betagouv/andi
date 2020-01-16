import logging
logger = logging.getLogger(__name__)
SQL_COMPANY = """
    INSERT INTO "siren_names" (
        siren,
        naf,
        cat_juridique,
        categorie,
        caractere_employeur,
        personne_physique,
        sociale_solidaire,
        nom,
        nom_moral,
        nom_physique,
        denominations
    )
VALUES (
    %(siren)s,
    %(naf)s,
    %(cat_juridique)s,
    %(categorie)s,
    %(caractere_employeur)s,
    %(personne_physique)s,
    %(sociale_solidaire)s,
    %(nom)s,
    %(nom_moral)s,
    %(nom_physique)s,
    %(denominations)s
)
RETURNING siren;
"""


def exec_row(cur, data_row, tag=False, dry_run=False):
    if not dry_run:
        cid = None
        cur.execute(sql_company(cur, data_row, tag))
        (cid,) = cur.fetchone()
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


def check_data_fields(d):
    """
    Check if there's value in the data row to be harvested
    """

    pers_fields = [
        'prenom1unitelegale',
        'nomunitelegale',
        'prenomusuelunitelegale',
        'nomusageunitelegale',
        'pseudonymeunitelegale'
    ]
    moral_fields = [
        'denominationunitelegale',
        'denominationusuelle1unitelegale',
        'denominationusuelle2unitelegale',
        'denominationusuelle3unitelegale',
    ]
    return {
        'pers_fields': any([has_value(d.get(field)) for field in pers_fields]),
        'moral_fields': any([has_value(d.get(field)) for field in moral_fields])
    }


def has_value(raw_string):
    string = raw_string.strip()
    return bool(string) and len(string) > 0 and string != "*"


def get_pers_name(d):
    if has_value(d.get('pseudonymeunitelegale')):
        return d.get('pseudonymeunitelegale')

    if has_value(d.get('prenomusuelunitelegale')) and has_value(d.get('nomusageunitelegale')):
        return f'{d.get("nomusageunitelegale")} {d.get("prenomusuelunitelegale")}'

    return f'{d.get("nomunitelegale")} {d.get("prenom1unitelegale")}'


def get_moral_name(d):
    moral_fields = [
        'denominationusuelle3unitelegale',
        'denominationusuelle2unitelegale',
        'denominationusuelle1unitelegale',
        'denominationunitelegale',
    ]
    for field in moral_fields:
        if has_value(d.get(field)):
            return d.get(field)

    logger.warning('Unexpected: could not find moral name for %s', d.get('siren'))
    return None


def sql_company(cur, d, tag):
    value = check_data_fields(d)
    if not value['pers_fields'] and not value['moral_fields']:
        logger.warning('No field of value found for %s', d.get('siren'))

    pers_name = None
    moral_name = None
    if value['pers_fields']:
        pers_name = get_pers_name(d)
    if value['moral_fields']:
        moral_name = get_moral_name(d)

    moral_fields = [
        'denominationunitelegale',
        'denominationusuelle1unitelegale',
        'denominationusuelle2unitelegale',
        'denominationusuelle3unitelegale',
    ]

    data = {
        'siren': d.get('siren'),
        'naf': d.get('activiteprincipaleunitelegale').replace('.', ''),
        'cat_juridique': d.get('categoriejuridiqueunitelegale'),
        'categorie': d.get('categorieEntreprise'),
        'caractere_employeur': d.get('caractereemployeurunitelegale') != 'N',
        'personne_physique': d.get('categoriejuridiqueunitelegale') == '1000',
        'sociale_solidaire': d.get('economiesocialesolidaireunitelegale') == 'O',
        'nom_moral': moral_name,
        'nom_physique': pers_name,
        'nom': moral_name if moral_name else pers_name,
        'denominations': [d.get(f) for f in moral_fields if has_value(d.get(f))]
    }

    return cur.mogrify(SQL_COMPANY, data)
