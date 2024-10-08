## Docker

Ce projet utilise Docker pour créer un environnement de développement reproductible et isolé. Les sections suivantes décrivent comment lance ce projet avec Docker.

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (souvent inclus avec Docker Desktop)

### Construction et Démarrage

Pour démarrer le projet avec Docker, suivez les étapes ci-dessous :

1. **Cloner le le projet depuis git** :

   ```bash
   git clone https://github.com/BoutaSafidinirina/g-pointage-front.git
   cd .\g-pointage-front\
   ```

2. **Construire l'image Docker et Démarrer les services Docker** :

   ```bash
   npm run start:dev_container
   ```

3. **Accéder à l'application** :

   Une fois les services démarrés, l'application sera accessible à l'adresse suivante :

   ```
   http://localhost:3000
   ```

### Arrêter les Services

Pour arrêter les services Docker, exécutez la commande suivante dans le terminal :

```bash
docker-compose down
```
