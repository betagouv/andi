## Script d'importation CSV
**WIP**
Script d'importation de données CSV vers une base de données. Il combine plusieurs outils, pour le moment
 spécifique à l'importation de données d'entreprise.

```
# Importation entreprise:
./csv2json.py --maxrows 100 ./CSV_FILE parse | ./json2db.py --company --config_file config.yaml

# Importation inscription
./csv2json.py --maxrows 100 --delimiter "," ./CSV_FILE parse | ./json2db.py --user --config_file config.yaml
```
