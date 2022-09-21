from typing import Type

from src.domain.interfaces.controllers.create_transaction_controller import (
    CreateTransactionControllerInterface,
)
from src.domain.dtos.models.Transaction import TransactionCreateDto
from src.domain.usecases.create_transaction_usecase import CreateTransactionUsecase


class CreateTransactionController(CreateTransactionControllerInterface):
    """Controller to create a transaction usecase"""

    def __init__(
        self, create_transaction_usecase: Type[CreateTransactionUsecase]
    ) -> None:
        self.__use_case = create_transaction_usecase

    async def handle(self, transaction_dto: TransactionCreateDto):
        """Handle to create transaction controller"""

        transaction_response = await self.__use_case.create_transaction(
            transaction_dto=transaction_dto
        )

        response = {"status_code": 201, "data": transaction_response}

        return response
