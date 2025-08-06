from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from models.db import db
import uuid

class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    cocktail_id = Column(String(36), ForeignKey('cocktails.id'), nullable=False)
    ingredient_id = Column(Integer, ForeignKey('ingredients.id'), nullable=False)

    cocktail = relationship("Cocktail", back_populates="recipes")
    ingredient = relationship("Ingredient", back_populates="recipes")
