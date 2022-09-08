from sqlalchemy.ext.asyncio import AsyncSession

from src.infra.repositories.credit_cards_repository import CreditCardsRepository
from src.infra.repositories.transactions_repository import TransactionsRepository

from src.domain.usecases.get_transactions_by_card_number_usecase import (
    GetTransactionsByCardNumberUsecase,
)
from src.presenters.controllers.get_transactions_by_card_number_controller import (
    GetTransactionsByCardNumberController,
)


def get_transactions_by_card_number_composer(db_session: AsyncSession):
    """get transactions by card_number composer"""

    transactions_infra = TransactionsRepository(db_session)
    credit_cards_infra = CreditCardsRepository(db_session)
    use_case = GetTransactionsByCardNumberUsecase(
        transactions_infra, credit_cards_infra
    )
    controller = GetTransactionsByCardNumberController(use_case)

    return controller
