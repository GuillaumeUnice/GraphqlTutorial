FROM node:latest

# Ajout du fichier de dépendances package.json
ADD package.json /home/

# Changement du repertoire courant
WORKDIR /home

# Installation des dépendances
RUN npm install

# Ajout des sources
#ADD . /home/
VOLUME /home

# On expose le port 3000
EXPOSE 3000

# On partage un dossier de log
# VOLUME /home/log

# On lance le serveur quand on démarre le conteneur
CMD npm start
