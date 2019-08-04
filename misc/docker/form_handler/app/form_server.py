from flask import Flask
from flask import request
app = Flask(__name__)


@app.route('/')
def hello():
    return 'coucou'


@app.route('/inscription', methods=['POST'])
def inscription():
    data = {
        'nom': request.form.get('nom'),
        'prenom': request.form.get('prenom'),
        'email': request.form.get('email')
    }
    print(data)
    return 'ok'
