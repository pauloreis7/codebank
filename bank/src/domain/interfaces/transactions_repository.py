from abc import ABC, abstractmethod

from src.domain.models.transaction import Transaction


class TransactionRepositoryInterface(ABC):
    """Transactions Repository Interface"""

    @abstractmethod
    async def create_transaction(self, transaction: Transaction) -> None:
        """Must implement"""

        raise Exception("Must implement create_transaction method")
