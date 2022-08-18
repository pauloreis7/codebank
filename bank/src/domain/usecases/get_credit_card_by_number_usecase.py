from typing import Type

from src.domain.models.credit_card import CreditCard
from src.domain.interfaces.repositories.credit_cards_repository import (
    CreditCardsRepositoryInterface,
)


class GetCreditCardByNumberUsecase:
    """Get credit card by number usecase"""

    def __init__(
        self, credit_cards_repository: Type[CreditCardsRepositoryInterface]
    ) -> None:
        self.__credit_cards_repository = credit_cards_repository

    async def get_credit_card_by_number(self, credit_card_number: str) -> CreditCard:
        """
        Get credit_card model by number
        :param  - credit_card_number: credit card number to find
        :returns - Dictionary with credit card information
        """

        credit_card = await self.__credit_cards_repository.get_credit_card_by_number(
            credit_card_number
        )

        if credit_card is None:
            raise Exception(status_code=404, detail="Credit card not found")

        return credit_card
