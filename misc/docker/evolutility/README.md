## Outil CRUD de gestion de base de données

Utilise une image docker, quelques fichiers de configuration et une version adaptée d'évolutility (l'outil crud en question)

Le docker contient l'API Graphql (server) et l'interface React (ui)

(still using default-assigned network, create docker subnet to fix this)
```
sudo docker build -t "evolutility" \
    --build-arg PG_USER=[USER] \
    --build-arg PG_PASS=[PASSWORD] \
    ./ && \
    sudo docker run -it --rm \
        --add-host=database:172.17.0.1 \
        -p=8080:3000 evolutility
```
