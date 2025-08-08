import os
from dotenv import load_dotenv


basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL_DEV"
    )

class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL_TEST"
    )

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL_PROD"
    )

def get_config():
    env = os.getenv("FLASK_ENV").lower()
    if env == "development":
        return DevelopmentConfig
    elif env == "testing":
        return TestingConfig
    elif env == "prod" or env == "production":
        return ProductionConfig
    else:
        return Config
