from typing import Type
from os import getenv
from json import dumps
from dotenv import load_dotenv
from grpc import StatusCode

from src.domain.models.transaction import Transaction
from src.domain.dtos.models.Transaction import TransactionCreateDto
from src.errors.grpc_request_error import GrpcRequestError
from src.domain.interfaces.repositories.credit_cards_repository import (
    CreditCardsRepositoryInterface,
)
from src.domain.interfaces.repositories.transactions_repository import (
    TransactionsRepositoryInterface,
)
from src.domain.interfaces.providers.message_producer_provider import (
    MessageProducerProviderInterface,
)

load_dotenv()

KAFKA_BOOTSTRAP_SERVERS = getenv("KAFKA_BOOTSTRAP_SERVERS")
KAFKA_TRANSACTIONS_TOPIC = getenv("KAFKA_TRANSACTIONS_TOPIC")


class CreateTransactionUsecase:
    """Create transaction usecase"""

    def __init__(
        self,
        credit_cards_repository: Type[CreditCardsRepositoryInterface],
        transactions_repository: Type[TransactionsRepositoryInterface],
        message_producer_provider: Type[MessageProducerProviderInterface],
    ) -> None:
        self.__credit_cards_repository = credit_cards_repository
        self.__transactions_repository = transactions_repository
        self.__message_producer_provider = message_producer_provider

    async def create_transaction(self, transaction_dto: TransactionCreateDto) -> None:
        """
        Create transaction model
        :param  - transaction_dto: Transaction data for create
        :returns - None for create transaction event status
        """

        check_credit_card_exists = (
            await self.__credit_cards_repository.get_credit_card_by_number(
                credit_card_number=transaction_dto.number
            )
        )

        if check_credit_card_exists is None:
            raise GrpcRequestError(
                code=StatusCode.NOT_FOUND, message="Credit card not found"
            )

        transaction = Transaction()

        transaction.credit_card_id = check_credit_card_exists.id
        transaction.amount = transaction_dto.amount
        transaction.status = "approved"
        transaction.store = transaction_dto.store
        transaction.description = transaction_dto.description

        check_credit_card_limit = (
            transaction.amount + check_credit_card_exists.balance
            > check_credit_card_exists.limit
        )

        if check_credit_card_limit:
            transaction.status = "rejected"

        response = await self.__transactions_repository.create_transaction(
            transaction=transaction
        )

        if transaction.status == "approved":
            updated_card_balance = check_credit_card_exists.balance + transaction.amount

            await self.__credit_cards_repository.patch_credit_card_balance(
                credit_card_id=transaction.credit_card_id,
                updated_balance=updated_card_balance,
            )

        transaction_message = {
            "transaction_id": str(transaction.id),
            "credit_card_number": check_credit_card_exists.number,
            "amount": transaction.amount,
            "store": transaction.store,
            "description": transaction.description,
            "payment_date": str(transaction.created_at),
        }

        serialized_message = dumps(transaction_message)

        self.__message_producer_provider.publish(
            bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
            topic=KAFKA_TRANSACTIONS_TOPIC,
            message=serialized_message,
        )

        return response
