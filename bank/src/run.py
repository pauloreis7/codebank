from asyncio import run
from uuid import uuid4

from src.domain.models.transaction import Transaction
from src.domain.interfaces.transactions_repository import (
    TransactionsRepositoryInterface,
)
from src.infra.repositories.transactions_repository import TransactionsRepository
from src.infra.config.db_connection import setup_db_session


async def get_transactions(transactionsRepository: TransactionsRepositoryInterface):
    transactions = await transactionsRepository.get_transactions()

    return transactions


async def create_transaction(transactionsRepository: TransactionsRepositoryInterface):

    transaction = Transaction()

    transaction.amount = 10
    transaction.status = "approved"
    transaction.description = "example transaction"
    transaction.store = "someStore"
    transaction.credit_card_id = uuid4()

    await transactionsRepository.create_transaction(transaction=transaction)

    return


async def main():
    db_session = await setup_db_session()

    transactionsRepository = TransactionsRepository(db_session)

    transactions = await get_transactions(transactionsRepository)

    print(transactions)

    await db_session().close()


run(main())
