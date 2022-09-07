from confluent_kafka import Producer
from os import getenv
from dotenv import load_dotenv

load_dotenv()


from src.domain.interfaces.providers.message_producer_provider import (
    MessageProducerProviderInterface,
)


class KafkaProducerProvider(MessageProducerProviderInterface):
    """Kafka Producer publish message provider"""

    def publish(self, bootstrap_servers: str, topic: str, message: str):
        config = {
            "bootstrap.servers": bootstrap_servers,
            "security.protocol": getenv("security.protocol"),
            "sasl.mechanisms": getenv("sasl.mechanisms"),
            "sasl.username": getenv("sasl.username"),
            "sasl.password": getenv("sasl.password"),
        }

        try:
            kafka_producer = Producer(config)

            kafka_producer.produce(topic=topic, value=message)

            kafka_producer.flush()
        except Exception as exception:
            print("Kafka exception:", exception)

        return
