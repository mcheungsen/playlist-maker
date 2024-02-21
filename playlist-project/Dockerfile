# Utiliser l'image officielle de Node.js pour le développement
FROM node:21.2.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application Vite écoute
EXPOSE 80

# Commande pour démarrer l'application Vite en mode développement
CMD ["npm", "run", "dev"]