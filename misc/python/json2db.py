#!/usr/bin/env python3
import json
import logging
import sys

import click
import psycopg2
import yaml

from lib_2db_company import exec_row as write_company
from lib_2db_user import exec_row as write_user

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('DEBUG'))
logger.addHandler(logging.StreamHandler())


def cfg_get(config):
    def_config_file = open('config_default.yaml', 'r')
    opt_config_file = None if not config else open(config, 'r')
    def_config = yaml.safe_load(def_config_file)
    config = {} if not config else yaml.safe_load(opt_config_file)
    return {**def_config, **config}


# ################################################################### MAIN FLOW
# #############################################################################
@click.command()
@click.option('--config_file', default=None)
@click.option('--company', is_flag=True)
@click.option('--user', is_flag=True)
@click.option('--debug', '-d', is_flag=True)
def main(config_file, company, user, debug):
    """
    Get json line by line, write to enterpise database
    Reads from stdin (pipe)
    """
    cfg = cfg_get(config_file)
    logging.debug('Config:\n%s', json.dumps(cfg, indent=2))
    logger.info('Starting import of csv data')
    count_success = 0
    count_error = 0
    with psycopg2.connect(**cfg['postgresql']) as conn, conn.cursor() as cur:
        for line in sys.stdin:
            try:
                record = json.loads(line)
                if debug:
                    logger.debug(record)
                iden = "no one"
                if company:
                    iden = write_company(cur, record)
                elif user:
                    iden = write_user(cur, record)
                else:
                    raise RuntimeError("No valid write destination specified")
                logger.debug(
                    'Wrote record for %s',
                    iden
                )
                count_success += 1
            except Exception as e:  # pylint:disable=broad-except
                logger.exception(e)
                count_error += 1
    logger.info(
        'Ended import of csv data, %s records written, %s failed',
        count_success,
        count_error
    )


if __name__ == '__main__':
    main(obj={})  # pylint:disable=no-value-for-parameter,unexpected-keyword-arg
