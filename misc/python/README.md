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

# Importation sirene (depuis docker):
./csv2json.py --delimiter "," --maxrows 1 /data/etablissements_95.csv parse  | ./json2db.py --sirene --tag csv_sirene_95 --config_file config.yaml

# Importation geo-données:
./csv2json.py --delimiter "|" --maxrows 2 ~/temp/lists_csv/output_27.csv  parse | ./json2db.py --here --config_file config.yaml
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

#### Geocoding
L'outil [Batch Geocoder API](https://developer.here.com/documentation/batch-geocoder/topics/introduction.html) de _here_ est utilisée pour le géocodage des données.

Celui-ci accepte en entrée des adresses sous cette forme:
```csv
recId|street|city|postalCode|country
118750|7 SQ DE VILLARD DE LANS|LOUVRES|95351|FRA
118752|CHEZ MME KUAKU CECILE 18 AV DES HERONS|CERGY|95127|FRA
118755|IMMEUBLE LE BOOSTER 2 RUE DU RAPPORTEUR|SAINT OUEN L'AUMONE|95572|FRA
118756|13 AV GENEVIEVE|DEUIL LA BARRE|95197|FRA
118758|53 RUE DES SAULES|PERSAN|95487|FRA
118760|10 RTE D ABLEIGES|OSNY|95476|FRA
118763|11 PL DE LA BORNE BLANCHE|BAILLET EN FRANCE|95042|FRA
```

Et répond, après traitement, sous celle-ci:
```
recId|SeqNumber|seqLength|displayLatitude|displayLongitude|locationLabel|houseNumber|street|district|city|postalCode|county|state|country
118750|1|1|49.04431|2.49932|7 Square de Villard de Lans, 95380 Louvres, France|7|Square de Villard de Lans||Louvres|95380|Val-d'Oise|Île-de-France|FRA
118752|1|1|49.04993|2.0202|18 Avenue des Hérons, 95800 Cergy, France|18|Avenue des Hérons||Cergy|95800|Val-d'Oise|Île-de-France|FRA
118755|1|1|49.04173|2.14402|2 Rue du Rapporteur, 95310 Saint-Ouen-l'Aumône, France|2|Rue du Rapporteur||Saint-Ouen-l'Aumône|95310|Val-d'Oise|Île-de-France|FRA
118756|1|1|48.97143|2.32393|13 Avenue Geneviève, 95170 Deuil-la-Barre, France|13|Avenue Geneviève||Deuil-la-Barre|95170|Val-d'Oise|Île-de-France|FRA
118758|1|1|49.15942|2.28432|53 Rue des Saules, 95340 Persan, France|53|Rue des Saules||Persan|95340|Val-d'Oise|Île-de-France|FRA
118760|1|1|49.06503|2.04581|10 Route d'Ableiges, 95520 Osny, France|10|Route d'Ableiges||Osny|95520|Val-d'Oise|Île-de-France|FRA
118763|1|1|49.06469|2.31686|11 Place de la Borne Blanche, 95560 Baillet-en-France, France|11|Place de la Borne Blanche||Baillet-en-France|95560|Val-d'Oise|Île-de-France|FRA
```

L'importation de ses données se fait comme les autres outils, avec le paramètre `hereGeoLoc`


###### Création de la liste pour geocodage:
```sql
COPY (select array_to_string(ARRAY[c.id_internal::text, array_to_string(addr, ' '), postal_commune, postal_code, 'FRA'], '|') from company c inner join company_contact cc on c.id_internal = cc.id_company where cc.postal_code LIKE 'XX%') TO '/tmp/list_XX.csv' (format csv, delimiter '|', quote '$');
```

#### Tableaux récapitulatifs / fiches
La création des fiches c'est principalement la conversion vers une mise en page "utilisable" de données CSV qui se trouvent dans le répertoire "raw_data"

L'export SQL des données des journeaux de bord en CSV se fait par:
```sql
COPY (SELECT * FROM form_jdb_psh) TO '/tmp/psh.csv' WITH CSV DELIMITER ',' HEADER;
```
