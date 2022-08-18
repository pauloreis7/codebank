from sqlalchemy.ext.asyncio import AsyncSession

from src.infra.repositories.credit_cards_repository import CreditCardsRepository
from src.infra.repositories.transactions_repository import TransactionsRepository

from src.domain.usecases.create_transaction_usecase import CreateTransactionUsecase
from src.presenters.controllers.create_transaction_controller import (
    CreateTransactionController,
)


def create_transaction_composer(db_session: AsyncSession):
    """create transaction composer"""

    transactions_infra = TransactionsRepository(db_session)
    credit_cards_infra = CreditCardsRepository(db_session)
    usecase = CreateTransactionUsecase(credit_cards_infra, transactions_infra)
    controller = CreateTransactionController(usecase)

    return controller
