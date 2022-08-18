from abc import ABC, abstractmethod

from src.domain.pydantic.models.Transaction import TransactionCreateDto


class CreateTransactionControllerInterface(ABC):
    """Create Transaction Controller Interface"""

    @abstractmethod
    async def handle(self, transaction_dto: TransactionCreateDto):
        """Method to handle request"""

        raise Exception("Must implement handler method")
