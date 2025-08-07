#!/bin/sh

# Lancer ollama en arrière-plan
ollama serve --port 5001 &

# Attendre quelques secondes que ollama soit prêt (optionnel)
sleep 5

# Lancer flask (ton backend) en premier plan
flask run --host=0.0.0.0 --port=5001
