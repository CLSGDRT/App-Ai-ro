from flask import Flask
from config import get_config
from models.db import db

# Initialisation Flask
app = Flask(__name__)
app_config = get_config()
app.config.from_object(app_config)
db.init_app(app)