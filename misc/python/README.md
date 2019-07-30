## Script d'importation CSV
**WIP**
Script d'importation de données CSV vers une base de données. Il combine plusieurs outils, pour le moment
 spécifique à l'importation de données d'entreprise.

```
./csv2json.py --maxrows 100 ./entreprises_pmsmp.csv parse | ./json2db.py --config_file config.yaml
```
