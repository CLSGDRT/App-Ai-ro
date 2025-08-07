# generate_image.py

import torch
from diffusers import DiffusionPipeline

MODEL_NAME = "SG161222/Realistic_Vision_V5.1_noVAE"
DEVICE = "cpu"

print("📦 Chargement du modèle...")
pipe = DiffusionPipeline.from_pretrained(MODEL_NAME)
pipe = pipe.to(DEVICE)
print("✅ Modèle chargé avec succès.")

def generate_image(prompt: str, width=200, height=200):
    image = pipe(
        prompt=prompt,
        width=width,
        height=height,
    ).images[0]
    image.save("cocktail.png")
    return image

