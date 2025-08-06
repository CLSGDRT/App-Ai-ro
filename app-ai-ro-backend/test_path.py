import os

class Config:
    @staticmethod
    def get_database_path():
        base_dir = os.path.abspath(os.path.dirname(__file__))
        return os.path.join(base_dir, 'database', 'apairo.db')

if __name__ == "__main__":
    print("Base directory (__file__ location) :")
    print(os.path.abspath(os.path.dirname(__file__)))
    print("Chemin complet vers la base de données :")
    print(Config.get_database_path())
