#!/usr/bin/env python3
import json
import logging
import sys

import click
import yaml

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('DEBUG'))
logger.addHandler(logging.StreamHandler())
sys.path.insert(1, './modules')


def cfg_get(config):
    def_config_file = open('config_default.yaml', 'r')
    opt_config_file = None if not config else open(config, 'r')
    def_config = yaml.safe_load(def_config_file)
    config = {} if not config else yaml.safe_load(opt_config_file)
    return {**def_config, **config}


def dict2table(data):
    html = ['<br><br><table width="99%" border=5 bordercolorlight="#ccc" bordercolordark="#444">']
    for k, v in data.items():
        html.append('<tr>')
        html.append(f'<th width="20%" style="padding:3px;background-color:#000;color:#fff;font-weight:bold">{ k }</th>')
        html.append(f'<td width="80%" style="padding:3px;">{ v }</td>')
        html.append('</tr>')
    html.append('</table>')
    return ''.join(html)


# ################################################################### MAIN FLOW
# #############################################################################
@click.command()
@click.option('--output', default='vtable')
@click.option('--output-file', default=None)
@click.option('--append', is_flag=True, default=False)
@click.option('--title', help='Title to add to output', default=None)
def main(output, output_file, append, title):
    """
    Get json line by line, write to enterpise database
    Reads from stdin (pipe)
    """
    for line in sys.stdin:
        record = json.loads(line)
        if output == 'vtable':
            html = dict2table(record)
        if output_file is not None:
            mode = 'a' if append else 'w'
            with open(output_file, mode) as f:
                if title is not None:
                    f.write(f'<h3>{title}</h3>\n')
                f.write(html)
        else:
            sys.stdout.write(html)


if __name__ == '__main__':
    main(obj={})  # pylint:disable=no-value-for-parameter,unexpected-keyword-arg
