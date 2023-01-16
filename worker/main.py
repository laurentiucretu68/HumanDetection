from celery import Celery
import requests


app = Flask(__name__)
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

@celery.task
def clean_external_files():
    response = requests.get('http://localhost:8080/')
    files = response.json()


    for file in files:
        if file['last_accessed_at'] < (datetime.now() - timedelta(days=30)):
            requests.delete('https://api.example.com/files/' + file['id'])

@app.route('/')
def index():
    clean_external_files.apply_async(countdown=86400)
    return 'Sarcina de curatare a fisierelor externe a fost adaugata in coada.'
