from behave import given, when, then
from src import form_server as server
import pickledb


@given(u'valid subscription data')
def step_impl(context):
    context.sub_data = {
        'nom': 'martin',
        'prenom': 'ricky',
        'email': 'martin.ricky@example.com'
    }


@when(u'I submit a complete subscription by POST')
def step_impl(context):
    context.response = context.server.post(
        '/inscription',
        data=context.sub_data
    )


@when(u'I submit a complete subscription by POST in JSON format')
def step_impl(context):
    context.response = context.server.post(
        '/inscription',
        json=context.sub_data
    )


@when(u'I submit a complete subscription by GET')
def step_impl(context):
    context.response = context.server.get(
        '/inscription',
        query_string=context.sub_data
    )


@then(u'I receive a response redirecting me to "{page}"')
def step_impl(context, page):
    assert context.response.status_code == 302
    assert page.encode('ascii') in context.response.data


@then(u'the response is in JSON')
def step_impl(context):
    assert context.response.content_type == 'application/json'


@then(u'it contains the same data that was being sent')
def step_impl(context):
    assert context.sub_data == context.response.get_json()


@then(u'I can check the information has been received')
def step_impl(context):
    store = pickledb.load(context.pickle_file, False)
    print(store.getall())
    key = server.data2hash(context.sub_data)
    assert store.get(key) is not False


@then(u'the response code indicates a failure')
def step_impl(context):
    assert context.response.status_code == 409


@then(u'the error message says "{message}"')
def step_impl(context, message):
    msg = context.response.get_json()
    assert msg['error'] == message
