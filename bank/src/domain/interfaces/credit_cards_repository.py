from abc import ABC, abstractmethod
from uuid import UUID

from src.domain.models.credit_card import CreditCard


class CreditCardsRepositoryInterface(ABC):
    """CreditCards Repository Interface"""

    @abstractmethod
    async def get_credit_card_by_number(self, credit_card_number: str) -> CreditCard:
        """Must implement"""

        raise Exception("Must implement get_credit_card_by_number method")

    @abstractmethod
    async def create_credit_card(self, credit_card: CreditCard) -> None:
        """Must implement"""

        raise Exception("Must implement create_credit_card method")

    @abstractmethod
    async def patch_credit_card_balance(
        self, credit_card_id: UUID, updated_balance: float
    ) -> None:
        """Must implement"""

        raise Exception("Must implement patch_credit_card_balance method")
