from typing import List
from abc import ABC, abstractmethod

from src.domain.models.transaction import Transaction


class TransactionsRepositoryInterface(ABC):
    """Transactions Repository Interface"""

    @abstractmethod
    async def get_transactions(
        self, skip: int = 0, limit: int = 100
    ) -> List[Transaction]:
        """Must implement"""

        raise Exception("Must implement get_transactions method")

    @abstractmethod
    async def create_transaction(self, transaction: Transaction) -> None:
        """Must implement"""

        raise Exception("Must implement create_transaction method")
