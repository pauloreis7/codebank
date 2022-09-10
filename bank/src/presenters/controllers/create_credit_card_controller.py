from typing import Type

from src.domain.dtos.models.CreditCard import CreditCardCreateDto
from src.domain.usecases.create_credit_card_usecase import CreateCreditCardUsecase
from src.domain.interfaces.controllers.create_credit_card_controller import (
    CreateCreditCardControllerInterface,
)


class CreateCreditCardController(CreateCreditCardControllerInterface):
    """Controller to create a credit card usecase"""

    def __init__(
        self, create_credit_card_usecase: Type[CreateCreditCardUsecase]
    ) -> None:
        self.__use_case = create_credit_card_usecase

    async def handle(self, credit_card_dto: CreditCardCreateDto):
        """Handle to create credit card controller"""

        credit_card = await self.__use_case.create_credit_card(
            credit_card_dto=credit_card_dto
        )

        response = {"status_code": 201, "data": credit_card}

        return response
