SQL_USER = """
    INSERT INTO "inscription" (
        prenom,
        nom,
        email,
        entry_point,
        date_inscription,
        questionnaire_sent
)
VALUES (
    %(prenom)s,
    %(nom)s,
    %(email)s,
    %(entry_point)s,
    to_timestamp(%(date_inscription)s, 'DD-MM-YYYY HH24:MI'),
    %(questionnaire_sent)s
)
"""


def exec_row(cur, data_row):
    cur.execute(sql_user(cur, data_row))
    return f"{data_row.get('prenom')} {data_row.get('nom')}"


def sql_user(cur, d):
    data = {
        'prenom': d.get('prenom'),
        'nom': d.get('nom'),
        'email': d.get('email'),
        'entry_point': d.get('point_dentree', '').split(',') + ['basin_airtable'],
        'date_inscription': d.get('date_dinscription'),
        'questionnaire_sent': d.get('questionnaire_envoye') == 'checked',
    }
    return cur.mogrify(SQL_USER, data)
