import os
# import tempfile
from behave import fixture, use_fixture
from src import form_server as server
import tempfile


@fixture
def form_server(context):
    app = server.app
    context.pickle_handle, context.pickle_file = tempfile.mkstemp()
    context.csv_handle, context.csv_file = tempfile.mkstemp()
    # Pickle db needs valid JSON in exising file...
    f = open(context.pickle_file, 'w')
    f.write('{"coucou": "1"}')
    f.close()

    app.config['pickle_db'] = context.pickle_file
    app.config['pickle_persist'] = True
    app.config['csv_file'] = context.csv_file
    app.testing = True

    context.server = app.test_client()
    yield context.server
    os.close(context.pickle_handle)
    os.unlink(context.pickle_file)
    os.close(context.csv_handle)
    os.unlink(context.csv_file)


def before_scenario(context, feature):
    use_fixture(form_server, context)


def before_all(context):
    context.server = None
