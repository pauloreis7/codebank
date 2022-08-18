from typing import List, Type

from src.domain.models.transaction import Transaction
from src.domain.interfaces.repositories.transactions_repository import (
    TransactionsRepositoryInterface,
)


class PaginateTransactionsUsecase:
    """Paginate transactions usecase"""

    def __init__(
        self,
        transactions_repository: Type[TransactionsRepositoryInterface],
    ) -> None:
        self.__transactions_repository = transactions_repository

    async def paginate_transactions(
        self, skip: int = 0, limit: int = 100
    ) -> List[Transaction]:
        """
        Read transactions and return pagination
        :param  - skip: Pagination skip item
                - limit: Pagination limit item
        :returns - List with all transactions information
        """

        response = await self.__transactions_repository.get_transactions(skip, limit)

        return response
