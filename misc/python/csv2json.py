#!/usr/bin/env python3
import csv
import json
import logging
import re
import sys

import click
import unidecode

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('DEBUG'))
logger.addHandler(logging.StreamHandler())


# ################################################################### MAIN FLOW
# #############################################################################
@click.group()
@click.pass_context
@click.argument('file')
@click.option('--delimiter', default='\t')
@click.option('--quotechar', default='"')
@click.option('--maxrows', default=0)
def main(ctx, file, delimiter, quotechar, maxrows):
    ctx.obj['file'] = file
    ctx.obj['csv'] = {
        'delimiter': delimiter,
        'quotechar': quotechar,
    }

    csv_data = []
    count = 0
    with open(ctx.obj['file'], newline='') as csvfile:
        reader = csv.DictReader(
            csvfile,
            delimiter=delimiter,
            quotechar=quotechar
        )
        for row in reader:
            r = {}
            for field, value in row.items():
                r[key_to_slug(field)] = value
            csv_data.append(r)
            count += 1
            if maxrows and count >= maxrows:
                break
    ctx.obj['data'] = csv_data


@main.command()
@click.pass_context
def test(ctx):
    """
    Test provided csv file, output a single row
    """
    print(json.dumps(ctx.obj['data'][1]))


@main.command()
@click.pass_context
def parse(ctx):
    """
    Loop through all rows, and output them
    """
    for row in ctx.obj['data']:
        sys.stdout.write(json.dumps(row) + "\n")


@main.command()
@click.pass_context
def keys(ctx):
    """
    Output keys / column titles
    """
    record = ctx.obj['data'][1]
    print(list(record.keys()))


def key_to_slug(raw_string):
    step1 = unidecode.unidecode(raw_string)
    step2 = re.sub('[^a-zA-Z0-9 ]', '', step1)
    return re.sub(r'\s+', '_', step2).lower()


if __name__ == '__main__':
    main({}, None, None, None, None)
