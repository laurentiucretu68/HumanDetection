import os
import shutil
from google.cloud import pubsub_v1
from dotenv import load_dotenv


load_dotenv()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./utils/credentials/pub_sub.json"
subscriber = pubsub_v1.SubscriberClient()
subscription_path = os.getenv('SUBSCRIPTION_PATH')


def callback(message):
    print(message)
    path = './' + str(message.data.decode('utf-8'))
    shutil.rmtree(path)
    message.ack()


if __name__ == '__main__':
    while True:
        streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
        with subscriber:
            try:
                streaming_pull_future.result()
            except Exception as e:
                streaming_pull_future.cancel()
                streaming_pull_future.result()
                print(e)
