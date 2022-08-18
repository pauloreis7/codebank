from typing import List
from abc import ABC, abstractmethod
from uuid import UUID

from src.domain.models.transaction import Transaction


class TransactionsRepositoryInterface(ABC):
    """Transactions Repository Interface"""

    @abstractmethod
    async def get_transactions_by_card_id(
        self, credit_card_id: UUID, skip: int = 0, limit: int = 100
    ) -> List[Transaction]:
        """Must implement"""

        raise Exception("Must implement get_transactions_by_card_id method")

    @abstractmethod
    async def create_transaction(self, transaction: Transaction) -> None:
        """Must implement"""

        raise Exception("Must implement create_transaction method")
