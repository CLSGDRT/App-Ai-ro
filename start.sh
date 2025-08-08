#!/bin/bash

echo "🚀 Démarrage des services..."

# Démarrer Ollama en arrière-plan
echo "📡 Démarrage d'Ollama..."
ollama serve &
OLLAMA_PID=$!

# Attendre qu'Ollama soit prêt
echo "⏳ Attente du démarrage d'Ollama..."
sleep 10

# Vérifier si Ollama répond
until curl -f http://localhost:11434/api/version >/dev/null 2>&1; do
    echo "⏳ Ollama n'est pas encore prêt, attente..."
    sleep 5
done

echo "✅ Ollama est prêt !"

# Lancer les migrations de la base de données
echo "🗃️  Application des migrations..."
alembic upgrade head

# Démarrer Flask SANS attendre le téléchargement du modèle
echo "🌶️  Démarrage de Flask..."
flask run --host=0.0.0.0 --port=5001 &
FLASK_PID=$!

# Télécharger le modèle EN PARALLÈLE (en arrière-plan)
echo "📥 Téléchargement du modèle llama3.1 en arrière-plan..."
ollama pull llama3.1 &

# Attendre Flask (processus principal)
wait $FLASK_PID