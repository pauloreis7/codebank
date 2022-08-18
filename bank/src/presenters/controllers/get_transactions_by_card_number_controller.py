from typing import Type

from src.domain.usecases.get_transactions_by_card_number_usecase import (
    GetTransactionsByCardNumberUsecase,
)
from src.domain.interfaces.controllers.get_transactions_by_card_number_controller import (
    GetTransactionsByCardNumberControllerInterface,
)


class GetTransactionsByCardNumberController(
    GetTransactionsByCardNumberControllerInterface
):
    """Controller to get transactions by credit card number usecase"""

    def __init__(
        self,
        get_transactions_by_card_number_usecase: Type[
            GetTransactionsByCardNumberUsecase
        ],
    ) -> None:
        self.__use_case = get_transactions_by_card_number_usecase

    async def handle(self, credit_card_number: str, skip: int = 0, limit: int = 100):
        """Handle to get transactions by credit card number controller"""

        transactions_pagination = await self.__use_case.get_transactions_by_card_number(
            credit_card_number=credit_card_number, skip=skip, limit=limit
        )

        response = {"status_code": 200, "data": transactions_pagination}

        return response
