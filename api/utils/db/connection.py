import os
from dotenv import load_dotenv
from firebase_admin import credentials, firestore, initialize_app


load_dotenv()

cred = credentials.Certificate(os.getenv('FIREBASE_CREDENTIALS'))
initialize_app(cred)

data_base = firestore.client()
