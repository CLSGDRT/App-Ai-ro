#!/bin/bash

echo "🚀 Démarrage du serveur Ollama..."
# Démarrer Ollama en arrière-plan
ollama serve &

# Attendre que Ollama soit prêt
echo "⏳ Attente du démarrage d'Ollama..."
sleep 10

# Vérifier si Ollama répond
until curl -f http://localhost:11434/api/version >/dev/null 2>&1; do
    echo "⏳ Ollama n'est pas encore prêt, attente..."
    sleep 5
done

echo "✅ Ollama est prêt !"

# Télécharger le modèle
echo "📥 Téléchargement du modèle llama3.1..."
ollama pull llama3.1

echo "✅ Modèle téléchargé avec succès !"

# Garder Ollama en vie en arrière-plan
wait