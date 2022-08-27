from typing import List, Type
from grpc import StatusCode

from src.domain.models.transaction import Transaction
from src.errors.grpc_request_error import GrpcRequestError
from src.domain.interfaces.repositories.transactions_repository import (
    TransactionsRepositoryInterface,
)
from src.domain.interfaces.repositories.credit_cards_repository import (
    CreditCardsRepositoryInterface,
)


class GetTransactionsByCardNumberUsecase:
    """Get transactions by card number usecase"""

    def __init__(
        self,
        transactions_repository: Type[TransactionsRepositoryInterface],
        credit_cards_repository: Type[CreditCardsRepositoryInterface],
    ) -> None:
        self.__credit_cards_repository = credit_cards_repository
        self.__transactions_repository = transactions_repository

    async def get_transactions_by_card_number(
        self, credit_card_number: str, skip: int = 0, limit: int = 100
    ) -> List[Transaction]:
        """
        Read transactions and return pagination
        :param  - credit_card_number: credit card number to find
                - skip: Pagination skip item
                - limit: Pagination limit item
        :returns - List with all transactions by card number information
        """

        check_credit_card_exists = (
            await self.__credit_cards_repository.get_credit_card_by_number(
                credit_card_number=credit_card_number
            )
        )

        if check_credit_card_exists is None:
            raise GrpcRequestError(
                code=StatusCode.NOT_FOUND, message="Credit card not found"
            )

        response = await self.__transactions_repository.get_transactions_by_card_id(
            credit_card_id=check_credit_card_exists.id,
            skip=skip,
            limit=limit,
        )

        return response
