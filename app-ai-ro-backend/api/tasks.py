import requests
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.graph import ApairoState

def send_to_img_func(state_data: dict):
    """Fonction de tâche pour générer l'image du cocktail"""
    print("Tâche reçue dans send_to_img")
    print(f"State data: {state_data}")
    
    try:
        state = ApairoState(**state_data)
    except Exception as e:
        print(f"Erreur lors de la création de l'état: {e}")
        return "state creation failed"
    
    def generate_image_prompt(cocktail_name=state.cocktail_name, description=state.description):
        return f"un cocktail du nom de : {cocktail_name}, ayant pour description : {description}"
    
    imagine_prompt = generate_image_prompt()
    print("Envoi du prompt au service image-generator")
    print(f"Prompt: {imagine_prompt}")
    
    try:
        response = requests.post("http://image-service:5004/generate", 
                               json={"prompt": imagine_prompt}, 
                               timeout=600)
        
        if response.status_code == 200:
            image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'cocktail.png'))
            with open(image_path, "wb") as f:
                f.write(response.content)
            print(f"Image sauvegardée: {image_path}")
            return "image generated"
        else:
            print(f"Erreur côté image-generator: {response.status_code} - {response.text}")
            return "image generation failed"
    except Exception as e:
        print(f"Erreur de connexion au service image: {str(e)}")
        return "connection error"