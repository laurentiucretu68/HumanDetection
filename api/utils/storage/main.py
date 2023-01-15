import os
from dotenv import load_dotenv
from google.cloud import storage
from utils.db.connection import data_base


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./utils/credentials/storage.json"
load_dotenv()
client = storage.Client()


def upload_file(file, name, email):
    user_id = [user.id for user in data_base.collection(u'users').where(u"email", u"==", email)
               .limit(1).stream()]

    if len(user_id):
        user_id = user_id[0]
        bucket = client.bucket(str(user_id).lower())
        if not bucket.exists():
            bucket.location = 'EU'
            bucket = client.create_bucket(bucket)

        blob = bucket.blob(name)
        stat = blob.upload_from_filename(os.path.join(file))
        return stat
    return False


def list_files(email):
    user_id = [user.id for user in data_base.collection(u'users').where(u"email", u"==", email)
               .limit(1).stream()]

    if user_id:
        bucket = client.bucket(str(user_id[0]).lower())
        if bucket.exists():
            blobs = bucket.list_blobs()
            return [(blob.name, blob.time_created) for blob in blobs]
    return []


def delete_file(file_name, email):
    user_id = [user.id for user in data_base.collection(u'users').where(u"email", u"==", email)
               .limit(1).stream()]

    if user_id:
        bucket = client.bucket(str(user_id[0]).lower())
        if bucket.exists():
            blobs = bucket.list_blobs()

            for blob in blobs:
                if blob.name == file_name:
                    blob.delete()
                    return True
    return False


def download_file(name, email):
    user_id = [user.id for user in data_base.collection(u'users').where(u"email", u"==", email)
               .limit(1).stream()]

    if user_id:
        bucket = client.bucket(str(user_id[0]).lower())
        if bucket.exists():
            blob = bucket.blob(f'{name}')
            if not os.path.exists(f'./{str(user_id[0]).lower()}'):
                os.mkdir(f'./{str(user_id[0]).lower()}')
                stat = blob.download_to_filename(f'./{str(user_id[0]).lower()}/{name}')
                return stat

    return False
