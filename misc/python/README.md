## Script d'importation CSV
**WIP**
Script d'importation de données CSV vers une base de données. Il combine plusieurs outils, pour le moment
 spécifique à l'importation de données d'entreprise.

Il faudrait un repo propre au code python pour tester correctement. En attendant, les tests flak8 et pylint peuvent s'exécuter en ligne de commande:
```
make test
```

## Installation:
 - créer, a partir de `config_default.yaml` un fichier `config.yaml` avec les paramètres qui conviennent
 - récuper l'un ou l'autre fichier CSV à transférer

## Utilisation:
Exemples d'utilisation:

```
# Importation entreprise:
./csv2json.py --maxrows 100 ./CSV_FILE parse | ./json2db.py --company --config_file config.yaml

# Importation inscription
./csv2json.py --maxrows 100 --delimiter "," ./CSV_FILE parse | ./json2db.py --user --config_file config.yaml
```

### Documentation:
#### csv2json
```
Usage: csv2json.py [OPTIONS] FILE COMMAND [ARGS]...

Options:
  --delimiter TEXT
  --quotechar TEXT
  --maxrows INTEGER
  --help             Show this message and exit.

Commands:
  keys   Output keys / column titles
  parse  Loop through all rows, and output them
  test   Test provided csv file, output a single row
```

#### json2db
```
Usage: json2db.py [OPTIONS]

  Get json line by line, write to enterpise database Reads from stdin (pipe)

Options:
  --config_file TEXT
  --company
  --user
  -d, --debug
  --help              Show this message and exit.
```
