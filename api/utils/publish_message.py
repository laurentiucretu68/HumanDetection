import os
from google.cloud import pubsub_v1
from dotenv import load_dotenv


load_dotenv()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./utils/credentials/pub_sub.json"

publisher = pubsub_v1.PublisherClient()
topic_path = os.getenv('TOPIC_PATH')


def publish_message(message):
	data = message.encode('utf-8')

	future = publisher.publish(topic_path, data)
	return future.result()
