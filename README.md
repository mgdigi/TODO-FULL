# TODO-FULL

I- BACKEND 
Backend du projet développé avec Node.js + TypeScript + Express + Prisma.
Il gère l’API, la base de données et la logique métier.

🚀 Installation

Cloner le projet

git clone  https://github.com/mgdigi/TODO-FULL.git
cd Back


Installer les dépendances

npm install


Configurer les variables d’environnement

Créer un fichier .env à la racine du dossier Back/ :

DATABASE_URL=.....
JWT_SECRET="ton_secret_jwt"
PORT=....
JWT_EXPIRES_IN=.....


⚠️ Adapter DATABASE_URL selon ton SGBD (PostgreSQL, MySQL, SQLite…).

🛠️ Commandes utiles
📦 Développement
npm run dev


➡️ Compile le code TypeScript et lance le serveur (dist/index.js).

🔨 Build (compilation)
npm run build


➡️ Compile uniquement le TypeScript dans le dossier dist.

▶️ Lancer en production
npm start


➡️ Exécute le build déjà compilé (dist/index.js).

🗄️ Prisma (Base de données)

Créer une migration

npm run migrate


Générer le client Prisma

npm run generate


Réinitialiser la base

npm run renitialise

📂 Structure du projet
Back/
│── prisma/           # Schéma Prisma (base de données)
│   └── schema.prisma
│── src/
│   ├── index.ts      # Point d'entrée serveur
│   ├── routes/       # Routes Express
│   ├── controllers/  # Logique métier
    ── repositories/
    ── services/
    ── types/
    ── validators/
│   ├── middlewares/  # Middlewares Express
│   └── utils/        # Fonctions utilitaires
│── dist/   
── uploads/          # stock les images enregistre 
 # Code compilé (JS)
│── package.json
│── tsconfig.json
│── .env

✅ Stack utilisée

Node.js + TypeScript

Express (API REST)

Prisma ORM

MySql 

JWT (authentification)

Zod (validation des données)

🔥 Lancer rapidement
git clone https://github.com/mgdigi/TODO-FULL.git
cd  Back
npm install
npm run migrate
npm run dev


Le serveur tourne sur http://localhost:PORT
 🎉