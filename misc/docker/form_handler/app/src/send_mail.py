import requests
import logging
from liquid import Liquid

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('DEBUG'))
logger.addHandler(logging.StreamHandler())

MASK_INSCRIPTION_HTML = """
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>{{sujet}}></title>
        <style type="text/css">
        body {margin: 1em; padding: 0px; min-width: 100%!important; font-family: verdana, monospace;}
        .content {width: 100%; max-width: 49em}
        .inscmail_bj {font-weight:bold; height: 3em;}
        .inscmail_te {padding-bottom: 3em; vertical-align:top}
        .inscmail_me {font-weight:bold;}
        .inscmail_ma a {color:#44c;}
        </style>
    </head>
    <body bgcolor="#f6f8f1">
        <table width="100%" bgcolor="#f6f8f1" border="0" cellpadding="0" cellspacing="0" class="content">
            <tr><td class="inscmail_bj">{{bonjour}}</td></tr>
            <tr><td class="inscmail_te">{{texte}}</td></tr>
            <tr><td class="inscmail_me">{{signature}}</td></tr>
            <tr><td class="inscmail_ma"><a href="{{mail}}">{{mail}}</a></td></tr>
        </table>
    </body>
</html>
"""

MASK_INSCRIPTION_TEXT = """
{{bonjour}}

{{texte}}

{{signature}}
{{mail}}
"""


MASK_NOTIFICATION = """
Nouvel reçu envoi sur {{form_type}}:

{{data}}
"""

MAILGUN_KEY = '8e99ddd0cc009cd90ba07d8d833036f1-73ae490d-6c9a2e13'
MAILGUN_SANDBOX = 'sandbox7d55d674a9244e9785e41e244cf89074.mailgun.org'


def send_mail(form_type, data, assets):
    logger.debug("Preparing to send mail %s", form_type)
    for key, value in assets.items():
        assets[key] = Liquid(value).render(**data)
    assets['texte'] = "<br />\n".join(assets['texte'].split("\n"))
    content_text = Liquid(MASK_INSCRIPTION_TEXT).render(**assets)
    content_html = Liquid(MASK_INSCRIPTION_HTML).render(**assets)
    result = send(
        recipient='pieterjan@montens.net',
        subject=assets.get('sujet', 'Courrier andi.beta.gouv.fr'),
        text=content_text,
        html=content_html
    )

    if result:
        logger.debug("Mail %s sent", form_type)
        return True

    logger.warning("Failed to send mail %s", form_type)
    return False


def send(recipient, subject, text, html=False):
    request_url = f'https://api.mailgun.net/v3/{MAILGUN_SANDBOX}/messages'
    request = requests.post(request_url, auth=('api', MAILGUN_KEY), data={
        'from': 'no-reply@example.com',
        'to': recipient,
        'subject': subject
        'text': text,
        'html': html,
        'h:Reply-To': 'andi@beta.gouv.fr'
    })
    return request.status_code == 200
