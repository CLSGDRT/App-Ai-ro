from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from models.db import db
import uuid

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False, unique=True)

    # Un ingrédient peut être utilisé dans plusieurs recettes
    recipes = relationship("Recipe", back_populates="ingredient", cascade="all, delete-orphan")
