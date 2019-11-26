#!/usr/bin/env python3
import json
import logging
import sys

import click
import psycopg2
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


def execute_get(name):
    module_path = f'lib_2db_{name}'
    logger.info('Module: %s', module_path)
    module = __import__(module_path)
    return getattr(module, 'exec_row')


# ################################################################### MAIN FLOW
# #############################################################################
@click.command()
@click.option('--config_file', default=None)
@click.option('--module', help='Set import module to be used', default=None)
@click.option('--company', is_flag=True)
@click.option('--company-update', is_flag=True)
@click.option('--user', is_flag=True)
@click.option('--sirene', is_flag=True)
@click.option('--here', is_flag=True)
@click.option('--debug', '-d', is_flag=True)
@click.option('--dry', is_flag=True)
@click.option('--tag', default=None)
def main(config_file, module, company, company_update, user, sirene, here, debug, dry, tag):
    """
    Get json line by line, write to enterpise database
    Reads from stdin (pipe)
    """
    if not module:
        raise RuntimeError('No module specified, add --module [SOME_MODULE]')

    cfg = cfg_get(config_file)
    logging.debug('Config:\n%s', json.dumps(cfg, indent=2))
    logger.info('Starting import of csv data')
    if dry:
        logger.warning("DRY RUN !!")
    count_success = 0
    count_error = 0

    execute = execute_get(module)

    with psycopg2.connect(**cfg['postgresql']) as conn, conn.cursor() as cur:
        for line in sys.stdin:
            try:
                record = json.loads(line)
                if debug:
                    logger.debug(record)
                iden = execute(cur, record, dry)
                # if here:
                #     iden = update_hero(cur, record, dry)
                # elif company:
                #     iden = write_company(cur, record)
                # elif company_update:
                #     iden = update_company(cur, record)
                # elif sirene:
                #     iden = write_sirene(cur, record, tag, dry)
                # elif user:
                #     iden = write_user(cur, record)
                # else:
                #     raise RuntimeError("No valid write destination specified")
                logger.debug(
                    'Wrote record for %s',
                    iden
                )
                count_success += 1
            except Exception as e:  # pylint:disable=broad-except
                logger.exception(e)
                count_error += 1
                conn.rollback()
    logger.info(
        'Ended import of csv data, %s records written, %s failed',
        count_success,
        count_error
    )


if __name__ == '__main__':
    main(obj={})  # pylint:disable=no-value-for-parameter,unexpected-keyword-arg
