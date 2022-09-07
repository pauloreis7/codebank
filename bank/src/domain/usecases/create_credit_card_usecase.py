from typing import Type
from random import randint
from datetime import datetime

from src.domain.models.credit_card import CreditCard
from src.domain.dtos.models.CreditCard import CreditCardCreateDto
from src.domain.interfaces.repositories.credit_cards_repository import (
    CreditCardsRepositoryInterface,
)


class CreateCreditCardUsecase:
    """Create credit card usecase"""

    def __init__(
        self, credit_cards_repository: Type[CreditCardsRepositoryInterface]
    ) -> None:
        self.__credit_cards_repository = credit_cards_repository

    async def create_credit_card(self, credit_card_dto: CreditCardCreateDto) -> None:
        """
        Create credit_card model
        :param  - credit_card_dto: Credit card data for create
        :returns - None for create credit_card event status
        """

        credit_card = CreditCard()

        credit_cards_count = (
            await self.__credit_cards_repository.get_credit_cards_count()
        )

        credit_card_number_length = 16 - len(str(credit_cards_count))
        credit_card_random_number = random_number_to_fixed_length(
            credit_card_number_length
        )
        formatted_credit_card_number = (
            f"{str(credit_card_random_number)}{credit_cards_count}"
        )
        current_month = int(datetime.now().strftime("%m"))
        credit_card_expiration_year = datetime.now().year + 5
        credit_card_random_cvv = random_number_to_fixed_length(3)

        credit_card.name = credit_card_dto.name.upper()
        credit_card.number = formatted_credit_card_number
        credit_card.expiration_month = current_month
        credit_card.expiration_year = credit_card_expiration_year
        credit_card.CVV = credit_card_random_cvv
        credit_card.balance = 0
        credit_card.limit = 1000.00

        response = await self.__credit_cards_repository.create_credit_card(
            credit_card=credit_card
        )

        return response


def random_number_to_fixed_length(number_length):
    range_start = 10 ** (number_length - 1)
    range_end = (10**number_length) - 1

    return randint(range_start, range_end)
