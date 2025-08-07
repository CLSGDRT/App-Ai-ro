# app.py

from flask import Flask, request, jsonify, send_file
from generate_image import generate_image
import tempfile
import os

app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "Missing prompt"}), 400

    image = generate_image(prompt)

    # Sauvegarde temporaire
    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    image.save(tmp_file.name)
    tmp_file.close()

    return send_file(tmp_file.name, mimetype="image/png")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5004)

