from typing import Type
from grpc import StatusCode

from src.domain.models.credit_card import CreditCard
from src.domain.dtos.models.CreditCard import CreditCardCreateDto
from src.errors.grpc_request_error import GrpcRequestError
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

        credit_card.name = credit_card_dto.name
        credit_card.number = credit_card_dto.number
        credit_card.expiration_month = credit_card_dto.expiration_month
        credit_card.expiration_year = credit_card_dto.expiration_year
        credit_card.CVV = credit_card_dto.CVV
        credit_card.balance = credit_card_dto.balance
        credit_card.limit = 1000.00

        check_credit_card_exists = (
            await self.__credit_cards_repository.get_credit_card_by_number(
                credit_card_number=credit_card.number
            )
        )

        if check_credit_card_exists:
            raise GrpcRequestError(
                code=StatusCode.ALREADY_EXISTS, message="Credit card already exists!"
            )

        response = await self.__credit_cards_repository.create_credit_card(
            credit_card=credit_card
        )

        return response
