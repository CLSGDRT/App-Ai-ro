import os
import sys
from flask import Flask, request, jsonify

# Ajouter le dossier parent au path pour importer utils.graph
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.graph import ApairoState, graph, assistant_graph
from models.db import db
from config import get_config


app = Flask(__name__)
app_config = get_config()
app.config.from_object(app_config)
db.init_app(app)

@app.route("/api/cocktail", methods=["POST"])
def cocktail():
    data = request.json
    if not data or "message" not in data:
        return jsonify({"error": "Le champ 'message' est obligatoire"}), 400

    message = data["message"]
    state = ApairoState(message=message)

    with app.app_context():
        # Exécuter le graphe
        result_state = assistant_graph.invoke(state)

    # Préparer la réponse JSON (transformer les listes en listes JSON)
    response = {
        "message": result_state.get("message"),
        "is_cocktail": result_state.get("is_cocktail"),
        "cocktail_name": result_state.get("cocktail_name"),
        "description": result_state.get("description"),
        "ingredients": result_state.get("ingredients"),
        "music_style": result_state.get("music_style"),
        "reply": result_state.get("reply"),
    }
    return jsonify(response)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
