from confluent_kafka import Producer
from dotenv import load_dotenv

from src.domain.interfaces.providers.message_producer_provider import (
    MessageProducerProviderInterface,
)

load_dotenv()


class KafkaProducerProvider(MessageProducerProviderInterface):
    """Kafka Producer publish message provider"""

    def publish(self, bootstrap_servers: str, topic: str, message: str):
        config = {
            "bootstrap.servers": bootstrap_servers,
        }

        try:
            kafka_producer = Producer(config)

            kafka_producer.produce(topic=topic, value=message)

            kafka_producer.flush()
        except Exception as exception:
            print("Kafka exception:", exception)

        return
