#!/usr/bin/env python3
import csv
import json
import logging
import pprint
import re
import sys

import click
import unidecode

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('DEBUG'))
logger.addHandler(logging.StreamHandler())


# #################################################################### MAIN FLOW
# ##############################################################################
@click.group()
@click.pass_context
@click.argument('file')
@click.option('--delimiter', default='\t')
@click.option('--quotechar', default='"')
def main(ctx, file, delimiter, quotechar):
    ctx.obj['file'] = file
    ctx.obj['csv'] = {
        'delimiter': delimiter,
        'quotechar': quotechar,
    }

@main.command()
@click.pass_context
def test(ctx):
    """
    Test provided csv file, output a single row
    """
    delimiter, quotechar = ctx.obj['csv']['delimiter'], ctx.obj['csv']['quotechar']
    out = []
    with open(ctx.obj['file'], newline='') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=delimiter, quotechar=quotechar)
        for row in reader:
            r = {}
            for field, value in row.items():
                r[key_to_slug(field)] = value
            out.append(r)
    print(json.dumps(out[1]))

def key_to_slug(raw_string):
    step1 = unidecode.unidecode(raw_string)
    step2 = re.sub('[^a-zA-Z0-9 ]', '', step1)
    return re.sub('\s+', '_', step2).lower()


if __name__ == '__main__':
    main(obj={})
