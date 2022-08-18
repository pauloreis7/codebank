from asyncio import run
from uuid import UUID

from src.domain.pydantic.models.CreditCard import CreditCardCreate
from src.domain.usecases.create_credit_card_usecase import CreateCreditCardUsecase
from src.domain.usecases.get_credit_card_by_number_usecase import (
    GetCreditCardByNumberUsecase,
)

from src.infra.config.db_connection import setup_db_session
from src.domain.interfaces.credit_cards_repository import CreditCardsRepositoryInterface
from src.infra.repositories.credit_cards_repository import CreditCardsRepository
from src.domain.models.transaction import Transaction
from src.domain.interfaces.transactions_repository import (
    TransactionsRepositoryInterface,
)
from src.infra.repositories.transactions_repository import TransactionsRepository


async def patch_credit_card_balance(
    creditCardsRepository: CreditCardsRepositoryInterface, credit_card_id: UUID
):

    await creditCardsRepository.patch_credit_card_balance(
        credit_card_id=credit_card_id, updated_balance=100
    )

    return


async def get_transactions(transactionsRepository: TransactionsRepositoryInterface):
    transactions = await transactionsRepository.get_transactions()

    return transactions


async def create_transaction(
    transactionsRepository: TransactionsRepositoryInterface, credit_card_id: UUID
):

    transaction = Transaction()

    transaction.amount = 10
    transaction.status = "approved"
    transaction.description = "example transaction"
    transaction.store = "someStore"
    transaction.credit_card_id = credit_card_id

    await transactionsRepository.create_transaction(transaction=transaction)

    return


async def main():
    db_session = await setup_db_session()

    transactionsRepository = TransactionsRepository(db_session)
    creditCardsRepository = CreditCardsRepository(db_session)

    create_credit_card_usecase = CreateCreditCardUsecase(creditCardsRepository)

    credit_card_data = CreditCardCreate(
        name="Jonh Doe",
        number="1234567",
        expiration_month=8,
        expiration_year=2024,
        CVV=123,
        balance=200,
        limit=1000,
    )

    await create_credit_card_usecase.create_credit_card(credit_card_data)

    get_credit_card_by_number_usecase = GetCreditCardByNumberUsecase(
        creditCardsRepository
    )

    response = await get_credit_card_by_number_usecase.get_credit_card_by_number(
        credit_card_number="1234567"
    )

    print(response)

    # credit_card = await get_credit_card_by_number(creditCardsRepository, "123456")
    # print(credit_card)

    transactions = await get_transactions(transactionsRepository)
    print(transactions)

    # await create_transaction(transactionsRepository, credit_card_id=credit_card.id)

    # updated_transactions = await get_transactions(transactionsRepository)
    # print(updated_transactions)

    # await patch_credit_card_balance(creditCardsRepository, credit_card.id)

    # updated_credit_card = await get_credit_card_by_number(
    #     creditCardsRepository, "123456"
    # )
    # print(updated_credit_card)

    await db_session().close()


run(main())
