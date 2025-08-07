# Base Python 3.10 slim Debian (stable)
FROM python:3.13-bookworm

# Variables d'environnement pour Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Crée et définit le répertoire de travail
WORKDIR /app

# Installe les dépendances système nécessaires pour torch, pillow, et compilation éventuelle
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    curl \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Copie uniquement le fichier requirements.txt au début (pour optimiser le cache Docker)
COPY requirements.txt .

# Mise à jour pip + installation des dépendances Python
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copie le code source complet (backend, api, models, utils, etc)
COPY app-ai-ro-backend ./app-ai-ro-backend

# Définit la variable d'environnement PYTHONPATH pour pouvoir importer app-ai-ro-backend facilement
ENV PYTHONPATH=/app/app-ai-ro-backend

# Expose le port 5001 (celui configuré dans app.py)
EXPOSE 5001

# Commande par défaut pour lancer Flask (remplacer par gunicorn en prod si besoin)
CMD ["python", "-m", "app-ai-ro-backend.api.app"]
