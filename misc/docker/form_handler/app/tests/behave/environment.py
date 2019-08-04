# import os
# import tempfile
from behave import fixture, use_fixture
from src import form_server as server

# @fixture
# def client(context, *args, **kwargs):
#     context.db, app.config['DATABASE'] = tempfile.mkstemp()
#     app.testing = True
#     context.client = app.test_client()
#     with app.app_context():
#         init_db()
#     yield context.client
#     # -- CLEANUP:
#     os.close(context.db)
#     os.unlink(app.config['DATABASE'])
@fixture
def form_server(context):
    server.app.testing = True
    context.server = server.app.test_client()
    yield context.server


def before_feature(context, feature):
    pass
    # -- HINT: Recreate a new flaskr client before each feature is executed.
    use_fixture(form_server, context)


def before_all(context):
    context.server = None
