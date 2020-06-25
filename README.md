# matcha
Front-end of our 42 group project Matcha
Back-end part added in the master branch.

[Linux section](#Linux-vm-42)

[Mac Section](#Mac)

### Linux vm 42

lancer le daemon docker
`Sudo dockerd`

lancer le conteneur dans le dossier /server/db
`sudo docker-compose -f docker-compose.yml up`

lancer le back-end à la racine
`sudo npm run setupServeur`

lancer le front-end à la racine
`sudo npm run setupFront`

### Mac

lancer le conteneur dans le dossier /server/db
`docker-compose -f docker-compose.yml up`

lancer le back-end à la racine
`npm run setupServer`

lancer le front-end à la racine
`npm run setupFront`

Ajouter dans la config l'email et le mdp

localhost:
-8080 serveur api
-3000 serveur front
-8081 serveur adminer/phpmyadmin
-33080 serveur php docker
