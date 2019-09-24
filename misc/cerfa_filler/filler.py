#!/usr/bin/env python3
import os
import click
import pypdftk

@click.command()
@click.pass_context
@click.argument('file')
@click.option('--file-out', help="output file", default=None)
def main(ctx, file, file_out):
    if not os.path.isfile(file):
        raise RuntimeError(f'File {file} does not exist')

    if not file_out:
        raise RuntimeError('No output file specified')

    data = {
        'Observations':
            'Ceci n\'est pas une observation',
        'Dénomination de l\'organisme prescripteur':
            'Ceci n\'est pas un organisme prescripteur',
        'Adresse de l&apos;organisme prescripteur':
            'C\'est dans le nord',
        'Forme juridique':
            'Pas vraiment'
    }

    pypdftk.fill_form(file, data, file_out)


if __name__ == '__main__':
    main(obj={})
