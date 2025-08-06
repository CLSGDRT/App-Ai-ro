from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from models.db import db
import uuid

class MusicStyle(db.Model):
    __tablename__ = 'music_styles'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))    
    name = Column(String(100), nullable=False, unique=True)

    cocktails = relationship("Cocktail", back_populates="music_style")
