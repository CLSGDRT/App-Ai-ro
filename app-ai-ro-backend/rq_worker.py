import os
import sys
import redis
from rq import Worker, Queue

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

redis_url = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
print(f"🔗 Connexion à Redis: {redis_url}")

conn = redis.from_url(redis_url)

if __name__ == '__main__':
    try:
        conn.ping()
        print("Connexion Redis réussie")
    except Exception as e:
        print(f"Erreur de connexion Redis: {e}")
        sys.exit(1)
    
    from api.tasks import send_to_img_func
    
    queue = Queue('default', connection=conn)
    worker = Worker([queue], connection=conn)
    
    print("Worker RQ démarré")
    worker.work()
