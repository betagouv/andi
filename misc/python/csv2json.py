#!/usr/bin/env python3
import csv
import json
import logging
import re
import sys

import click
import unidecode
import unicodedata

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('DEBUG'))
logger.addHandler(logging.StreamHandler())


def parse_filters(filters):
    """
    Change filters into lambdas, which are later called in a map
    function to generate a list with results, all of which
    have to evaluate to True in order to proceed to output
    """
    lambadas = []
    for f in filters:
        if '==' in f:
            key, value = f.split('==')
            lambadas.append(lambda x: x[key] == value)
    return lambadas


def reader(ctx):
    filters = ctx.obj['filters']
    maxrows = ctx.obj['maxrows']
    delimiter, quotechar = ctx.obj['csv']['delimiter'], ctx.obj['csv']['quotechar']
    count = 0
    skipped_count = 0

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
            if filters is not False:
                results = list(map(lambda f: f(r), filters))
                if not all(results):
                    skipped_count += 1
                    if skipped_count % 1000 == 0:
                        logger.debug('Skipped due to filter (skipped: %s, stored: %s)', skipped_count, count)
                    continue
            yield(r)
            count += 1
            if maxrows and count >= maxrows:
                break


def key_to_slug(raw_string):
    step1 = unidecode.unidecode(raw_string)
    step2 = re.sub('[^a-zA-Z0-9 ]', '', step1)
    return re.sub(r'\s+', '_', step2).lower()


def normalize(string):
    string = string.lower()
    return ''.join(c for c in unicodedata.normalize('NFD', string) if unicodedata.category(c) != 'Mn')


# ################################################################### MAIN FLOW
# #############################################################################
@click.group()
@click.pass_context
@click.argument('file')
@click.option('--delimiter', default='\t')
@click.option('--quotechar', default='"')
@click.option('--maxrows', default=0)
@click.option('--filter', '-f', 'filters_in', multiple=True, default=False, help="Add Key=Value filter that has to match")
def main(ctx, file, delimiter, quotechar, maxrows, filters_in):
    ctx.obj['file'] = file
    ctx.obj['maxrows'] = maxrows
    ctx.obj['csv'] = {
        'delimiter': delimiter,
        'quotechar': quotechar,
    }

    if filters_in:
        ctx.obj['filters'] = parse_filters(filters_in)
        logger.debug('%s filters added', len(ctx.obj['filters']))
    else:
        ctx.obj['filters'] = False

    # XXX: This is probably not optimal, reading of file should happen later,
    # which could avoid the necessity to store it all in an array
    # with open(ctx.obj['file'], newline='') as csvfile:
    #     reader = csv.DictReader(
    #         csvfile,
    #         delimiter=delimiter,
    #         quotechar=quotechar
    #     )
    #     for row in reader:
    #         r = {}
    #         for field, value in row.items():
    #             r[key_to_slug(field)] = value
    #         if filters_in:
    #             results = list(map(lambda f: f(r), filters))
    #             if not all(results):
    #                 skipped_count += 1
    #                 if skipped_count % 1000 == 0:
    #                     logger.debug('Skipped due to filter (skipped: %s, stored: %s)', skipped_count, count)
    #                 continue
    #         csv_data.append(r)
    #         count += 1
    #         if maxrows and count >= maxrows:
    #             break
    # ctx.obj['data'] = csv_data


@main.command()
@click.pass_context
def test(ctx):
    """
    Test provided csv file, output a single row
    """
    for row in reader(ctx):
        print(json.dumps(row))
        break


@main.command()
@click.pass_context
def parse(ctx):
    """
    Loop through all rows, and output them
    """
    for row in reader(ctx):
        sys.stdout.write(json.dumps(row) + "\n")


@main.command()
@click.pass_context
@click.option('--field', help='Field to search on', default=None)
@click.option('--value', help='Value to find', default=None)
@click.option('--non-null', is_flag=True, default=False)
def find(ctx, field, value, non_null):
    """
    Find value in field, then output
    """
    needle = normalize(value)
    for row in reader(ctx):
        if field in row and normalize(row[field]) == needle:
            logging.debug('Found "%s" occurence: %s', value, row[field])
            if non_null:
                data = {k: v for k, v in row.items() if v}
            else:
                data = row
            sys.stdout.write(json.dumps(data) + "\n")


@main.command()
@click.pass_context
def keys(ctx):
    """
    Output keys / column titles
    """
    for row in reader(ctx):
        print(list(row.keys()))
        break


if __name__ == '__main__':
    main(obj={})  # pylint:disable=no-value-for-parameter, unexpected-keyword-arg
