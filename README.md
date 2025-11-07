# 💰 Budget Tracker - Application MERN

Application simple de gestion de budget développée avec la stack MERN (MongoDB, Express, React, Node.js).

## 🚀 Fonctionnalités

- ✅ Ajouter des transactions (revenus/dépenses)
- ✅ Voir le solde en temps réel
- ✅ Historique des transactions
- ✅ Supprimer des transactions
- ✅ Interface responsive

## 📋 Prérequis

- Docker et Docker Compose installés
- Node.js 18+ (pour développement local)
- Git

## 🏃 Démarrage Rapide

### Avec Docker (Recommandé)

```bash
# Cloner le projet
git clone https://github.com/votre-username/budget-tracker.git
cd budget-tracker

# Lancer avec Docker Compose
docker-compose up -d

# Accéder à l'application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

### Sans Docker

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## 🧪 Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📁 Structure du Projet

```
budget-tracker/
├── backend/
│   ├── server.js          # API Express
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.js        # Composant principal
│   │   └── App.css
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml     # Orchestration
```

## 🛠️ Stack Technique

- **Frontend:** React 18
- **Backend:** Node.js + Express
- **Base de données:** MongoDB
- **Conteneurisation:** Docker

## 📝 API Endpoints

- `GET /api/health` - Vérifier l'état du serveur
- `GET /api/transactions` - Récupérer toutes les transactions
- `POST /api/transactions` - Créer une transaction
- `DELETE /api/transactions/:id` - Supprimer une transaction
- `GET /api/balance` - Obtenir le solde

## 🔧 Variables d'Environnement

**Backend (.env):**
```
PORT=5000
MONGO_URI=mongodb://mongo:27017/budgettracker
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

**MongoDB ne démarre pas:**
```bash
docker-compose down -v
docker-compose up -d
```

**Frontend ne se connecte pas au backend:**
- Vérifier que le backend tourne sur le port 5000
- Vérifier la variable `REACT_APP_API_URL`

## 📄 Licence

MIT

## 👨‍💻 Auteur

Dr. El Hadji Bassirou TOURÉ - DMI/FST/UCAD
