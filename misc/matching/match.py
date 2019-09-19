#!/usr/bin/env python3
import click
import logging
import yaml
import json
import os
import json
import csv
import exec_drive
import lib_match

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('INFO'))
logger.addHandler(logging.StreamHandler())

"""
Usage:
./match.py --lat 32.1344 --lon 5.1213 --rome ROME1 --rome ROME2

Each rome code has a NAF definition file, used for scoring naf/rome adequacy
"""


def cfg_get(config=''):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    defpath = f'{current_dir}/config.default.yaml'
    optpath = f'{current_dir}/{config}'
    def_config_file = open(defpath, 'r')
    opt_config_file = open(optpath, 'r') if os.path.exists(optpath) else None
    def_config = yaml.safe_load(def_config_file)
    config = {} if not opt_config_file else yaml.safe_load(opt_config_file)
    return {**def_config, **config}


# ################################################################### MAIN FLOW
# #############################################################################
@click.group()
@click.option('--config_file', default=None)
@click.option('--debug', is_flag=True, default=False)
@click.option('--limit', help="Limit output rows (testing only)", default=False)
@click.pass_context
def main(ctx, config_file, debug, limit):
    if debug:
        logger.setLevel(logging.getLevelName('DEBUG'))
        logger.debug('Debugging enabled')

    ctx.obj['cfg'] = cfg_get(config_file)
    logger.debug('Loaded Config:\n%s', json.dumps(ctx.obj['cfg'], indent=2))

    if limit:
        logger.warning('Output Limiter set to %s', limit)
        ctx.obj['cfg']['limit'] = limit


@main.command()
@click.pass_context
def list_drive(ctx):
    profiles = exec_drive.get_data(ctx.obj['cfg'])
    logger.info('Outputting available profiles')
    print(json.dumps(list(profiles.keys()), indent=2))


@main.command()
@click.pass_context
@click.option('--profile', help="specify profile(s)", multiple=True, default=None)
def run_drive(ctx, profile):
    logger.info('Getting settings from google drive')
    profiles = exec_drive.get_data(ctx.obj['cfg'])
    results = {}
    for k, params in profiles.items():
        if profile and k not in profile:
            continue
        logger.info('Running match for profile %s', k)
        logger.debug(json.dumps(params, indent=2))
        try:
            results[k] = lib_match.run_profile(ctx.obj['cfg'], **params)
        except Exception as e:
            logger.exception(e)
            logger.warning('Failed parsing profile %s, skipping', k)

    for key, result in results.items():
        keys = result[0].keys()
        temp_file = f'./output/{key}.csv'
        with open(temp_file, 'w') as output_csv:
            dwriter = csv.DictWriter(output_csv, keys)
            dwriter.writeheader()
            dwriter.writerows(result)
        logger.info('CSV file %s written', temp_file)


@main.command()
@click.option('--csv-file', help="output csv file", default='output.csv')
@click.option('--lat', help="latitude", default='49.0619')
@click.option('--lon', help="longitude", default='2.0861')
@click.option('--max-distance', help="Max distance (km)", default=10)
@click.option('--rome', help="rome code", multiple=True, default=None)
@click.option('--include', help="Include naf code", multiple=True, default=None)
@click.option('--exclude', help="Exclude naf code", multiple=True, default=None)
@click.option('--tpe/--no-tpe', help="Include 'Très Petites Entreprises' < 10 pers", default=None)
@click.option('--pme/--no-pme', help="Include 'Petites et Moyennes Entreprises' 10 - 249 pers", default=None)
@click.option('--eti/--no-eti', help="Include 'Entreprises de Taille Intermédiaire' 250 - 4999 pers", default=None)
@click.option('--ge/--no-ge', help="Include 'Grandes Entreprises' > 5000 pers", default=None)
@click.pass_context
def run_csv(ctx, csv_file, lat, lon, max_distance, rome, include, exclude, tpe, pme, eti, ge):
    cfg = ctx.obj['cfg']
    logger.info(
        'Matching started, lat/lon %s/%s, max %s km, ROME: %s',
        lat,
        lon,
        max_distance,
        ', '.join(rome),
    )

    sizes = []
    if tpe:
        sizes.append('tpe')
    if pme:
        sizes.append('pme')
    if eti:
        sizes.append('eti')
    if ge:
        sizes.append('ge')

    results = lib_match.run_profile(cfg, lat, lon, max_distance, rome, include, exclude, sizes)

    print('Obtained results preview (score is naf / size / geo / welcome / contact):')
    for row in results[:20]:
        score = f"({row['score_naf']}-{row['score_size']}-{row['score_geo']}-{row['score_welcome']}-{row['score_contact']} => {row['score_total']})"
        print(f"{row['naf']}  {row['nom']:32.30}\t{row['sector']:35.37}\t{row['distance']}\t{score}\t{row['id']}")

    keys = results[0].keys()
    with open(csv_file, 'w') as output_csv:
        dwriter = csv.DictWriter(output_csv, keys)
        dwriter.writeheader()
        dwriter.writerows(results)
        logger.info('CSV file %s written', csv_file)


if __name__ == '__main__':
    main(obj={})  # pylint:disable=no-value-for-parameter, unexpected-keyword-arg
