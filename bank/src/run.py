from asyncio import run

from src.domain.pydantic.models.Transaction import TransactionCreateDto
from src.domain.usecases.create_transaction_usecase import CreateTransactionUsecase

from src.domain.pydantic.models.CreditCard import CreditCardCreate
from src.domain.usecases.create_credit_card_usecase import CreateCreditCardUsecase
from src.domain.usecases.paginate_transactions_usecase import (
    PaginateTransactionsUsecase,
)
from src.domain.usecases.get_credit_card_by_number_usecase import (
    GetCreditCardByNumberUsecase,
)

from src.infra.config.db_connection import setup_db_session
from src.infra.repositories.credit_cards_repository import CreditCardsRepository
from src.infra.repositories.transactions_repository import TransactionsRepository


def hydrate_transaction_dto():

    transaction_dto = TransactionCreateDto(
        amount=10,
        store="someStore",
        description="example transaction",
        name="Jonh Doe",
        number="1234567",
        expirationMonth=8,
        expirationYear=2024,
        CVV=123,
    )

    return transaction_dto


async def main():
    db_session = await setup_db_session()

    transactionsRepository = TransactionsRepository(db_session)
    creditCardsRepository = CreditCardsRepository(db_session)

    create_credit_card_usecase = CreateCreditCardUsecase(creditCardsRepository)
    get_credit_card_by_number_usecase = GetCreditCardByNumberUsecase(
        creditCardsRepository
    )

    paginate_transactions_usecase = PaginateTransactionsUsecase(transactionsRepository)
    create_transaction_usecase = CreateTransactionUsecase(
        creditCardsRepository, transactionsRepository
    )

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

    credit_card_response = (
        await get_credit_card_by_number_usecase.get_credit_card_by_number(
            credit_card_number="1234567"
        )
    )
    print("credit_card_response ===>", credit_card_response)

    response = await paginate_transactions_usecase.paginate_transactions()
    print("paginate_transactions ===>", response)

    transaction_dto = hydrate_transaction_dto()

    await create_transaction_usecase.create_transaction(
        transaction_data=transaction_dto
    )

    new_response = await paginate_transactions_usecase.paginate_transactions()
    print("new_paginate_transactions ===>", new_response)

    new_credit_card_response = (
        await get_credit_card_by_number_usecase.get_credit_card_by_number(
            credit_card_number="1234567"
        )
    )
    print("new_credit_card_response ===>", new_credit_card_response)

    await db_session().close()


run(main())
