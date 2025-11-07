FROM node:18-alpine

WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le code
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
