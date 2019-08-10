import requests
import logging
import os
import json
import mistune
import urllib
from requests.utils import requote_uri
import re
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
{{mail_text}}
"""


MASK_NOTIFICATION = """
Nouvel reçu envoi sur {{form_type}}:

{{data}}
"""

MAILGUN_KEY = os.environ['MG_KEY']
MAILGUN_SANDBOX = os.environ['MG_BOX']

def notify_mail(form_type, data):
    text = Liquid(MASK_NOTIFICATION).render(form_type=form_type, data=json.dumps(data, indent=4))
    subject = f'Formulaire reçu type "{form_type}"'
    send(
        recipient='andi@beta.gouv.fr',
        subject=subject,
        text=text
    )

def get_template(form_type):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    path = f'{current_dir}/templates/{form_type}.html'
    with open(path, 'r') as f:
        data = f.read()
    return data


def send_mail(form_type, data, assets):
    logger.debug("Preparing to send mail %s", form_type)
    data['nom_url'] = requote_uri(data['nom'])
    data['prenom_url'] = requote_uri(data['prenom'])
    for key, value in assets.items():
        assets[key] = Liquid(value).render(**data)

    mail_text = mistune.markdown(assets['texte'], escape=False)
    content_text = cleanhtml(Liquid(MASK_INSCRIPTION_TEXT).render(mail_text=mail_text))
    content_html = Liquid(get_template(form_type)).render(mail_text=mail_text, mail_subject=assets['sujet'])

    result = send(
        recipient=data['email'],
        subject=assets.get('sujet', 'Courrier andi.beta.gouv.fr'),
        text=content_text,
        html=content_html
    )

    if result:
        logger.debug("Mail gg%s sent", form_type)
        return True

    logger.warning("Failed to send mail %s", form_type)
    return False


def send(recipient, subject, text, html=None):
    request_url = f'https://api.eu.mailgun.net/v3/{MAILGUN_SANDBOX}/messages'
    data = {
        'from': 'ANDi no-reply <no-reply@mailgun.bilo.be>',
        'to': recipient,
        'subject': subject,
        'text': text,
        'html': html,
        'h:Reply-To': 'ANDi <andi@beta.gouv.fr>'
    }

    # if not html:
    #     del data['html']

    request = requests.post(
        request_url,
        auth=('api', MAILGUN_KEY),
        data=data
    )
    return request.status_code == 200

def cleanhtml(raw_html):
  cleanr = re.compile('<.*?>')
  cleantext = re.sub(cleanr, '', raw_html)
  return cleantext
