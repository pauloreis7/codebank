from typing import Type

from src.domain.usecases.paginate_transactions_usecase import (
    PaginateTransactionsUsecase,
)
from src.domain.interfaces.controllers.paginate_transactions_controller import (
    PaginateTransactionsControllerInterface,
)


class PaginateTransactionsController(PaginateTransactionsControllerInterface):
    """Controller to paginate transactions usecase"""

    def __init__(
        self, paginate_transactions_usecase: Type[PaginateTransactionsUsecase]
    ) -> None:
        self.__use_case = paginate_transactions_usecase

    async def handle(self, skip: int = 0, limit: int = 100):
        """Handle to paginate transactions controller"""

        transactions_pagination = await self.__use_case.paginate_transactions(
            skip=skip, limit=limit
        )

        response = {"status_code": 200, "data": transactions_pagination}

        return response
