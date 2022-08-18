from asyncio import run
from uuid import UUID

from src.infra.config.db_connection import setup_db_session
from src.domain.models.credit_card import CreditCard
from src.domain.interfaces.credit_cards_repository import CreditCardsRepositoryInterface
from src.infra.repositories.credit_cards_repository import CreditCardsRepository
from src.domain.models.transaction import Transaction
from src.domain.interfaces.transactions_repository import (
    TransactionsRepositoryInterface,
)
from src.infra.repositories.transactions_repository import TransactionsRepository


async def get_credit_card_by_number(
    creditCardsRepository: CreditCardsRepositoryInterface, credit_card_number: str
):
    credit_card = await creditCardsRepository.get_credit_card_by_number(
        credit_card_number
    )

    return credit_card


async def create_credit_card(
    creditCardsRepository: CreditCardsRepositoryInterface,
):

    credit_card = CreditCard()

    credit_card.name = "Jonh Doe"
    credit_card.number = "123456"
    credit_card.expiration_month = 8
    credit_card.expiration_year = 2024
    credit_card.CVV = 123
    credit_card.balance = 200
    credit_card.limit = 1000

    await creditCardsRepository.create_credit_card(credit_card=credit_card)

    return


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

    await create_credit_card(creditCardsRepository)

    credit_card = await get_credit_card_by_number(creditCardsRepository, "123456")
    print(credit_card)

    transactions = await get_transactions(transactionsRepository)
    print(transactions)

    await create_transaction(transactionsRepository, credit_card_id=credit_card.id)

    updated_transactions = await get_transactions(transactionsRepository)
    print(updated_transactions)

    await patch_credit_card_balance(creditCardsRepository, credit_card.id)

    updated_credit_card = await get_credit_card_by_number(
        creditCardsRepository, "123456"
    )
    print(updated_credit_card)

    await db_session().close()


run(main())
