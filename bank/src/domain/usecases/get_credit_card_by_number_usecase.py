from typing import Type
from grpc import StatusCode

from src.domain.models.credit_card import CreditCard
from src.errors.grpc_request_error import GrpcRequestError
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
            raise GrpcRequestError(code=StatusCode.NOT_FOUND, message="Credit card not found")

        return credit_card
