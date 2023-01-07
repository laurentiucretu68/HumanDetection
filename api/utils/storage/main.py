import os
from dotenv import load_dotenv
from google.cloud import storage
from utils.db.connection import data_base


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./utils/credentials/storage.json"
load_dotenv()
client = storage.Client()


def upload_file(file, name, email):
    user_id = [user.id for user in data_base.collection(u'users').where(u"email", u"==", email)
               .limit(1).stream()][0]

    if user_id:
        bucket = client.get_bucket(str(user_id).lower())
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
        bucket = client.get_bucket(str(user_id[0]).lower())
        blobs = bucket.list_blobs()

        return [(blob.name, blob.time_created) for blob in blobs]
    return []


def delete_file(file_name, email):
    user_id = [user.id for user in data_base.collection(u'users').where(u"email", u"==", email)
               .limit(1).stream()]

    if user_id:
        bucket = client.get_bucket(str(user_id[0]).lower())
        blobs = bucket.list_blobs()

        for blob in blobs:
            if blob.name == file_name:
                blob.delete()
                return True
    return False


async def download_file(name, email):
    user_id = [user.id for user in data_base.collection(u'users').where(u"email", u"==", email)
               .limit(1).stream()]

    if user_id:
        bucket = await client.bucket(str(user_id).lower())

        blob = await bucket.blob(name)
        with open(os.path.join(name)) as f:
            stat = await client.download_blob_to_file(blob, f)
            if stat is True:
                return f
    return False
