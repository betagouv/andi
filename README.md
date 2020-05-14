[![Build Status](https://travis-ci.org/betagouv/andi.svg?branch=master)](https://travis-ci.org/betagouv/andi)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-no-red.svg)](https://GitHub.com/betagouv/andi-matching/graphs/commit-activity)
[![Generic badge](https://img.shields.io/badge/ANDi-toujours-green.svg)](https://shields.io/)
<p align="center">
  <a href="https://andi.beta.gouv.fr">
    <img alt="Début description. Marianne. Fin description." src="https://upload.wikimedia.org/wikipedia/fr/3/38/Logo_de_la_R%C3%A9publique_fran%C3%A7aise_%281999%29.svg" width="90" />
  </a>
</p>
<h1 align="center">
  andi.beta.gouv.fr
</h1>

[ANDi](https://andi.beta.gouv.fr) est une service numérique en développement visant à faciliter l'immersion professionnelle des personnes en situation de handicap.

# 🚀 C'est parti !

## Les dépôts constitutifs d'ANDi

- 🧭 Celui-ci, qui contient le site disponible sur [andi.beta.gouv.fr](https://andi.beta.gouv.fr)
- 🐳 [andi-docker](https://github.com/betagouv/andi-docker/), qui contient les images docker des services secondaires (gestionnaire formulaire, backoffice, ...)
- 🎚 [andi-matching](https://github.com/betagouv/andi-matching/), qui contient l'algorithme de matching et les interfaces d'accès (CLI, API, ...)
- 📟 [andi-matching-ui](https://github.com/betagouv/andi-matching-ui/), qui contient un prototype d'interface web pour l'outil de matching (obsolète)
- 🏗 [andi-service](https://github.com/betagouv/andi-service), qui contient le MVP du service numérique développé par ANDi
- 🧪 [andi-data](https://github.com/betagouv/andi-data), qui contient les outils et résultats d'analyses des données dans le cadre du développement du service ANDi
- 🐍 [andi-python](https://github.com/betagouv/andi-python), qui contient divers outils et scripts python utilisés lors des phases d'expérimentation d'ANDi


# 🧭 Page d'accueil d'ANDi
Ce dépôt contient la page d'accueil (_landing page_) d'ANDi. Il emploi une approche JAMStack (serverless) sur base de node.js, react et [gatsby](https://www.gatsbyjs.org/). L'accessibilité est forcément un aspect fondamental des interfaces d'ANDi, et à logiquement orienté les choix des technologies mises en oeuvre par ANDi.

## Déployer en local
1. cloner le dépot
2. installer les dépendances : `npm install --dev`
3. lancer gatsby : `gatsby develop`
4. le site local sera mis à disposition sur `http://localhost:8000`

Gatsby à été configuré pour intégrer des outils de validation de l'accessibilité, en particulier [Axe](https://www.deque.com/axe/), autant via la console du navigateur (ou la console react, si installée) que lors du cycle CI/CD.

## Déploiement production
Le déploiement se fait en continu à chaque _merge_ sur la branche _master_. Le CI de Travis (détaillé dans le fichier `.travis.yml`) assure les tests, la compilation et le déploiement des pages sur les serveurs d'ANDi.

## le répertoire _misc_
Divers éléments qui ne justifient pas (encore) la mise en place et la maintenance de dépôts distincts:
- **ansible** : scripts de configuration des serveurs web utilisés par ANDi
- **python** : scripts de traitement et d'enregistrement en base de données de données CSV diverses
- **python_charting** : graphiques générés en python à des fins d'illustration et de demonstration
- **sql** : schemas et configuration des bases de données d'ANDi
