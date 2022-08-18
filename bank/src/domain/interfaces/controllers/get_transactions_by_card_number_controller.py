from abc import ABC, abstractmethod


class GetTransactionsByCardNumberControllerInterface(ABC):
    """Get Transactions By Card Number Controller Interface"""

    @abstractmethod
    async def handle(self, credit_card_number: str, skip: int = 0, limit: int = 100):
        """Method to handle request"""

        raise Exception("Must implement handler method")
