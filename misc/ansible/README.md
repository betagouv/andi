## Scripts ansible pour configuration des serveurs ANDi

Différents scripts qui permettent de configurer et mettre en place l'environnement de production des services d'ANDi

### Détails des _playbooks_

- **secure_ssh**: configuration accès SSH
- **default_apps**: applications par défaut
- **docker_suppport**: Support docker

### Exécution
Le playbook `secure_ssh` s'exécute avec les droits d'aministrateur (root). Les autres utilisent l'utilisateur de déploiement définit dans les _playbooks_

#### Exemples:
```bash
# configuration SSH
ansible-playbook secure_ssh.yml -i inv.ini -u root --ask-pass

# applications par défaut et autres playbooks
ansible-playbook default_apps.yml -i inv.ini -b --become-user=root
```
