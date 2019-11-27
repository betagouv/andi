#!/bin/bash

./csv2json.py \
    --delimiter "," \
    -f "etatadministratifetablissement==A" \
    -f "caractereemployeuretablissement==O" \
    ./raw_data/StockEtablissement_utf8.csv parse | \
dd obs=50M | \
parallel --max-lines=5000 --pipe ./json2db.py --module siren --tag csv_siren_datagouv --config_file config.yaml

