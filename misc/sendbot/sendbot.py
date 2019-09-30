#!/usr/bin/env python3
import logging
import click
from airtable import Airtable
import os

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('INFO'))
logger.addHandler(logging.StreamHandler())


# ################################################################### MAIN FLOW
# #############################################################################
@click.group()
@click.pass_context
@click.option('--debug', is_flag=True, default=False)
@click.option('--dry-run', is_flag=True, default=False)
def main(ctx, debug, dry_run):
    if debug:
        logger.setLevel(logging.getLevelName('DEBUG'))
        logger.debug('Debugging enabled')
    ctx.obj['dry_run'] = dry_run

    for x in ['AIRTABLE_KEY', 'AIRTABLE_BASE_KEY', 'AIRTABLE_TABLE']:
        if x not in os.environ:
            raise RuntimeError(f'Missing env variable "{x}"')
        ctx.obj[x.lower()] = os.environ[x]
    logger.info('Preparing to query airtable "%s"', ctx.obj['airtable_table'])


@main.command()
@click.pass_context
def run(ctx):
    pass


if __name__ == '__main__':
    main(obj={})  # pylint:disable=no-value-for-parameter, unexpected-keyword-arg
