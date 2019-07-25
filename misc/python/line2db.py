#!/usr/bin/env python3
import logging
import sys

import click

logger = logging.getLogger(__name__)
logger.setLevel(logging.getLevelName('DEBUG'))
logger.addHandler(logging.StreamHandler())


# #################################################################### MAIN FLOW
# ##############################################################################
@click.command()
def main():
    """
    Get csv line by line, write to enterpise database
    Reads from stdin (pipe)
    """
    for line in sys.stdin:
        try:
            record = to_article(json.loads(line))
            sys.stdout.write(json.dumps(record) + "\n")
        except Exception as e:
            logger.exception(e)



if __name__ == '__main__':
    main()
