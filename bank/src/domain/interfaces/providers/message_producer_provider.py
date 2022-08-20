from abc import ABC, abstractmethod


class MessageProducerProviderInterface(ABC):
    """Message Producer Provider Interface"""

    @abstractmethod
    def publish(self, bootstrap_servers: str, message: str, topic: str):
        """Method to handle request"""

        raise NotImplementedError("Must implement publish method")
