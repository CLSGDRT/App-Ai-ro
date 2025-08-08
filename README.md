Voici un exemple de `README.md` clair et complet pour expliquer le fonctionnement de ton application React + Flask, avec les points essentiels :

````markdown
# app-AI-ro

app-AI-ro est une application web fullstack permettant de découvrir et générer des cocktails originaux à partir d’un message utilisateur, avec une interface moderne en React et un backend Flask.

---

## Fonctionnalités principales

- **Liste paginée des cocktails** : affichage des cocktails disponibles avec pagination.
- **Détail d’un cocktail** : page dédiée affichant les ingrédients, description et style musical associé.
- **Génération de cocktails personnalisés** : envoi d’un message au backend qui analyse et crée un cocktail correspondant.
- **Affichage d’images de cocktails générées**
- **Navigation fluide** via React Router avec un design responsive.
- **Interface mobile-friendly** avec menu hamburger.

---

## Technologies utilisées

- **Frontend :**
  - React 18 avec TypeScript
  - React Router v6
  - Axios pour les requêtes HTTP
  - Tailwind CSS pour le design
  - Headless UI et Heroicons pour composants UI

- **Backend :**
  - Flask (Python)
  - SQLAlchemy avec SQLite pour la base de données
  - Flask-CORS pour la gestion des requêtes cross-origin
  - RQ (Redis Queue) pour la gestion des tâches asynchrones (génération d’images)
  - Une architecture modulaire avec modèles `Cocktail`, `Recipe`, `Ingredient`, `MusicStyle`

---

## Structure du projet

- `/frontend` : code React (composants, pages, routes, styles)
- `/backend` : code Flask (routes API, modèles, tâches asynchrones)
- `/backend/api/tasks.py` : logique de génération et traitement cocktail/image
- `/backend/models` : définitions SQLAlchemy des entités

---

## Installation & démarrage en local ou sur VM

### Prérequis

- Python 3.8+
- Node.js 16+
- Redis (pour RQ)
- Git

### Backend

1. Créer et activer un environnement virtuel Python :

   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows

2. Installer les dépendances :

   pip install -r requirements.txt

3. Lancer Redis (localement ou via Docker) :

   redis-server

4. Démarrer le backend Flask :

   export FLASK_APP=app.py
   flask run
   alembic upgrade head

5. Démarrer le worker RQ dans un autre terminal :

   rq worker


### Frontend

1. Installer les dépendances :

   cd frontend
   npm install

2. Démarrer l’application React en mode développement :

   npm run dev

3. Accéder à l’application via `http://localhost:5173` (ou autre port affiché)

## Installation & démarrage via Docker

### Prérequis

- Docker

### Applications complète

1. Créer et monter l'image sur Docker :

   docker compose up --build -d

2. Accéder à l'application via `http://<ip du conteneur>:5173`

---

## Utilisation

* Naviguer vers **Les cocktails** pour voir la liste paginée.
* Cliquer sur un cocktail pour voir ses détails.
* Aller sur **Le mixeur** pour générer un cocktail à partir d’un message personnalisé.
* Le backend analyse le message, génère une recette et renvoie un cocktail avec son style musical associé.
* Le résultat est affiché dans l’interface avec possibilité de voir l’image du cocktail.

---

## Notes importantes

* L’application utilise CORS pour permettre la communication frontend/backend en local.
* Les images sont générées et stockées côté backend via des tâches asynchrones (RQ).
* J'ai réalisé en parallèle un micro service qui gère la partie génération d'image pour contourner les limitations qu'impose une machine type macbook et Flask.
* Le contenu généré peut comporter des erreurs, vérifier toujours les données importantes.

---

## Contribution

Contributions bienvenues via Pull Requests ou issues.

---

## Licence

MIT

---

## Auteur

app-AI-ro — projet personnel de CLSGDRT

