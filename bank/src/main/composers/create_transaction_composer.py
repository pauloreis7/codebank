from sqlalchemy.ext.asyncio import AsyncSession

from src.infra.repositories.credit_cards_repository import CreditCardsRepository
from src.infra.repositories.transactions_repository import TransactionsRepository
from src.infra.kafka.producer_kafka import KafkaProducerProvider

from src.domain.usecases.create_transaction_usecase import CreateTransactionUsecase
from src.presenters.controllers.create_transaction_controller import (
    CreateTransactionController,
)


def create_transaction_composer(db_session: AsyncSession):
    """create transaction composer"""

    transactions_infra = TransactionsRepository(db_session)
    credit_cards_infra = CreditCardsRepository(db_session)
    message_producer = KafkaProducerProvider()
    use_case = CreateTransactionUsecase(
        credit_cards_infra, transactions_infra, message_producer
    )
    controller = CreateTransactionController(use_case)

    return controller
