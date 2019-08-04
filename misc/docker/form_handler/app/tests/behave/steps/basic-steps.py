from behave import given, when, then


@given(u'an instance of the server application')
def step_impl(context):
    assert context.server is not None


@when(u'I send an empty head query')
def step_impl(context):
    context.response = context.server.get('/')
    print(context.response.__dict__)


@then(u'I receive a response indicating it worked')
def step_impl(context):
    assert context.response.status_code == 200


@then(u'it contains "{text}"')
def step_impl(context, text):
    # response is bin string
    assert context.response.data == text.encode('ascii')
