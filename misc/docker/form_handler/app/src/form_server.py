import os
import pickledb
import yaml
import json
import pgware
import csv
import logging
import send_mail
from flask import (
    Flask,
    request,
    Response,
    redirect,
    jsonify,
    abort,
    g
)
logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('DEBUG'))
logger.addHandler(logging.StreamHandler())

"""
TODO:
    - validate input
    - send mail confirming subscription
    - send mail forwarding subscription information
"""


def cfg_get(config=''):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    defpath = f'{current_dir}/config.default.yaml'
    optpath = f'{current_dir}/{config}'
    def_config_file = open(defpath, 'r')
    opt_config_file = open(optpath, 'r') if os.path.exists(optpath) else None
    def_config = yaml.safe_load(def_config_file)
    config = {} if not opt_config_file else yaml.safe_load(opt_config_file)
    return {**def_config, **config}


def data2hash(data):
    key_info = f'{data["nom"]}{data["prenom"]}{data["email"]}'
    return str(hash(key_info))


def get_local_store(app):
    if 'pickledb' not in g:
        g.pickledb = pickledb.load(
            app.config['pickle_db'],
            app.config['pickle_persist']
        )

    return g.pickledb


def get_db(app):
    if 'pgw' not in g:
        g.pgw = pgware.build(
            client='psycopg2',
            auto_json=False,
            **app.config['postgresql']
        )
    return g.pgw.get_connection()


def write_user(d, dbconn):
    data = {
        'prenom': d.get('prenom'),
        'nom': d.get('nom'),
        'email': d.get('email'),
        'entry_point': ['landing_page', 'integration_test']
    }
    dbconn.execute(SQL_USER, data)


def get_assets(formtype, dbconn):
    result = dbconn.execute(f'SELECT key, value FROM asset WHERE description = \'mail_{formtype}\'')
    results = result.fetchall()
    data = {k: v for k, v in results}
    return(data)


SQL_USER = """
    INSERT INTO "inscription" (
        prenom,
        nom,
        email,
        entry_point
)
VALUES (
    %(prenom)s,
    %(nom)s,
    %(email)s,
    %(entry_point)s
)
"""



# ################################################################ FLASK ROUTES
# #############################################################################
def create_app():
    app = Flask(__name__)
    app.config = {**app.config, **cfg_get('./config.yaml')}

    @app.route('/')
    def hello():
        return 'form server'

    @app.route('/inscription', methods=['GET', 'POST'])
    def inscription():
        is_post = request.method == 'POST'
        is_get = request.method == 'GET'
        is_json = request.content_type == 'application/json'
        if is_get:
            data = {
                'nom': request.args.get('nom'),
                'prenom': request.args.get('prenom'),
                'email': request.args.get('email')
            }
        elif is_json:
            data = request.get_json()
        else:
            data = {
                'nom': request.form.get('nom'),
                'prenom': request.form.get('prenom'),
                'email': request.form.get('email')
            }
        data['form_type'] = 'landing_page'

        if not data['nom']:
            logger.warning('Missing field NOM')
            abort(400)
        if not data['prenom']:
            logger.warning('Missing field PRENOM')
            abort(400)
        if not data['email']:
            logger.warning('Missing field EMAIL')
            abort(400)

        with get_db(app) as dbconn:
            assets = get_assets(data['form_type'], dbconn)

        send_mail.send_mail(data['form_type'], data, assets)
        return 'ok'

        submission_key = data2hash(data)
        store = get_local_store(app)
        if store.get(submission_key) is not False:  # Data already received
            if is_post and not is_json:
                return redirect("https://andi.beta.gouv.fr/merci", code=302)
            return Response(
                json.dumps({'error': 'data already submitted'}),
                status=409,
                mimetype='application/json'
            )

        store.set(submission_key, 'true')
        with get_db(app) as dbconn:
            write_user(data, dbconn)

        with open(app.config['csv_file'], 'a', newline='') as csvf:
            columns = ['nom', 'prenom', 'email', 'ip']
            wr = csv.DictWriter(csvf, columns)
            wr.writerow({'ip': request.remote_addr, **data})

        # redirect with 302, even if 303 is more (too ?) specific
        if is_post and not is_json:
            return redirect("https://andi.beta.gouv.fr/merci", code=302)

        return jsonify(data)
    return app


if __name__ == '__main__':
    create_app().run()
