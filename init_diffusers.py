import torch
from diffusers import DiffusionPipeline

MODEL_NAME = "SG161222/Realistic_Vision_V5.1_noVAE"
DEVICE = "cpu"

print("📦 Chargement du modèle Diffusers...")
pipe = DiffusionPipeline.from_pretrained(MODEL_NAME)
pipe = pipe.to(DEVICE)
print("✅ Modèle chargé avec succès.")
