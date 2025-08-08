import os
import sys
import redis
from rq import Queue

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from dotenv import load_dotenv
from flask import Flask, request, jsonify, abort, send_file
from config import get_config

load_dotenv()
app = Flask(__name__)
app_config = get_config()
app.config.from_object(app_config)

redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
print(f"🔗 Configuration Redis URL: {redis_url}")

try:
    redis_conn = redis.from_url(redis_url)
    redis_conn.ping()
    task_queue = Queue('default', connection=redis_conn)
    print("Connexion Redis établie")
except Exception as e:
    print(f"Erreur de connexion Redis: {e}")
    redis_conn = None
    task_queue = None

from api.tasks import send_to_img_func

from flask_cors import CORS
from utils.graph import ApairoState, assistant_graph
from models.db import db
from models.cocktail import Cocktail
from models.recipe import Recipe
from models.music_style import MusicStyle

db.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/api/cocktails", methods=["GET"])
def get_all_cocktails():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    pagination = Cocktail.query.order_by(Cocktail.name.asc()).paginate(page=page, per_page=per_page, error_out=False)
    cocktails = pagination.items
    result = [
        {
            "id": c.id,
            "name": c.name,
            "description": c.description,
            "music_style": c.music_style.name if c.music_style else None,
            "ingredients": [r.ingredient.name for r in c.recipes]
        }
        for c in cocktails
    ]
    return jsonify({
        "cocktails": result,
        "total": pagination.total,
        "pages": pagination.pages,
        "page": pagination.page,
        "per_page": pagination.per_page
    }), 200

@app.route("/api/cocktails/<string:cocktail_id>", methods=["GET"])
def get_cocktail(cocktail_id):
    cocktail = Cocktail.query.get(cocktail_id)
    if not cocktail:
        abort(404, description="Cocktail not found")
    result = {
        "id": cocktail.id,
        "name": cocktail.name,
        "description": cocktail.description,
        "music_style": cocktail.music_style.name if cocktail.music_style else None,
        "ingredients": [r.ingredient.name for r in cocktail.recipes]
    }
    return jsonify(result), 200

@app.route("/api/cocktails/", methods=["POST"])
def cocktail():
    if not task_queue:
        return jsonify({"error": "Service de tâches non disponible"}), 503
        
    data = request.json
    if not data or "message" not in data:
        return jsonify({"error": "Le champ 'message' est obligatoire"}), 400
    
    message = data["message"]
    state = ApairoState(message=message)
    
    try:
        result_state = assistant_graph.invoke(state)
        state_dict = result_state.__dict__ if hasattr(result_state, '__dict__') else dict(result_state)
        
        job = task_queue.enqueue(send_to_img_func, state_dict)
        print(f"Tâche envoyée avec ID: {job.id}")
        
    except Exception as e:
        print(f"Erreur lors de l'envoi de la tâche: {e}")
    
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

@app.route('/api/cocktail-image')
def cocktail_image():
    image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'cocktail.png'))
    if not os.path.exists(image_path):
        return {"error": "Image non trouvée"}, 404
    return send_file(image_path, mimetype='image/png')

@app.route("/api/test-redis")
def test_redis():
    if not task_queue:
        return jsonify({"status": "ERROR", "error": "Redis connection failed"}), 500
        
    try:
        redis_conn.ping()
        job = task_queue.enqueue(send_to_img_func, {"cocktail_name": "Test", "description": "Test cocktail"})
        return jsonify({"status": "OK", "job_id": job.id}), 200
    except Exception as e:
        return jsonify({"status": "ERROR", "error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)