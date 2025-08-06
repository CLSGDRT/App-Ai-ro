from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from models.db import db
import uuid

class Cocktail(db.Model):
    __tablename__ = 'cocktails'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    description = Column(String(255))

    music_style_id = Column(Integer, ForeignKey('music_styles.id'), nullable=True)

    music_style = relationship("MusicStyle", back_populates="cocktails")
    recipes = relationship("Recipe", back_populates="cocktail", cascade="all, delete-orphan")
