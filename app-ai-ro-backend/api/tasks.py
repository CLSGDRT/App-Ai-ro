import requests
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask_rq import RQ
from utils.graph import ApairoState

rq = RQ()

@rq.job
def send_to_img(state_data: dict):
    state = ApairoState(**state_data)
    print("💡 Tâche reçue dans send_to_img")
    print(f"State: {state}")

    def generate_image_prompt(cocktail_name=state.cocktail_name, description=state.description):
        return f"un cocktail du nom de : {cocktail_name}, ayant pour description : {description}"

    imagine_prompt = generate_image_prompt()

    print("📡 Envoi du prompt au service image-generator...")
    response = requests.post("http://localhost:5004/generate", json={"prompt": imagine_prompt})

    if response.status_code == 200:
        with open("cocktail.png", "wb") as f:
            f.write(response.content)
        print("✅ Image sauvegardée sous cocktail.png")
        return "image generated"
    else:
        print("❌ Erreur côté image-generator:", response.text)
        return "image generation failed"
