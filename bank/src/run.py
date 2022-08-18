from asyncio import run
from src.domain.dtos.hydrate_dtos.hydrate_credit_card_dto import (
    hydrate_credit_card_dto,
)
from src.domain.dtos.hydrate_dtos.hydrate_transaction_dto import (
    hydrate_transaction_dto,
)

from src.domain.dtos.models.Transaction import TransactionCreateDto
from src.domain.usecases.create_transaction_usecase import CreateTransactionUsecase

from src.presenters.controllers.create_credit_card_controller import (
    CreateCreditCardController,
)
from src.presenters.controllers.get_transactions_by_card_number_controller import (
    GetTransactionsByCardNumberController,
)
from src.presenters.controllers.create_transaction_controller import (
    CreateTransactionController,
)

from src.domain.dtos.models.CreditCard import CreditCardCreateDto
from src.domain.usecases.create_credit_card_usecase import CreateCreditCardUsecase
from src.domain.usecases.get_transactions_by_card_number_usecase import (
    GetTransactionsByCardNumberUsecase,
)
from src.domain.usecases.get_credit_card_by_number_usecase import (
    GetCreditCardByNumberUsecase,
)

from src.infra.config.db_connection import setup_db_session
from src.infra.repositories.credit_cards_repository import CreditCardsRepository
from src.infra.repositories.transactions_repository import TransactionsRepository


async def main():
    db_session = await setup_db_session()

    transactions_infra = TransactionsRepository(db_session)
    credit_cards_infra = CreditCardsRepository(db_session)

    get_credit_card_by_number_usecase = GetCreditCardByNumberUsecase(credit_cards_infra)
    create_credit_card_usecase = CreateCreditCardUsecase(credit_cards_infra)
    get_transactions_by_card_number_usecase = GetTransactionsByCardNumberUsecase(
        transactions_infra, credit_cards_infra
    )
    create_transaction_usecase = CreateTransactionUsecase(
        credit_cards_infra, transactions_infra
    )

    create_credit_card_controller = CreateCreditCardController(
        create_credit_card_usecase
    )
    get_transactions_by_card_number_controller = GetTransactionsByCardNumberController(
        get_transactions_by_card_number_usecase
    )
    create_transaction_controller = CreateTransactionController(
        create_transaction_usecase
    )

    credit_card_dto = hydrate_credit_card_dto(
        dto=CreditCardCreateDto(
            name="Jonh Doe",
            number="12345678",
            expiration_month=8,
            expiration_year=2024,
            CVV=123,
            balance=200,
            limit=1000,
        )
    )

    create_credit_card_response = await create_credit_card_controller.handle(
        credit_card_dto=credit_card_dto
    )

    print("create_credit_card_response ===>", create_credit_card_response)

    credit_card_response = (
        await get_credit_card_by_number_usecase.get_credit_card_by_number(
            credit_card_number="12345678"
        )
    )
    print("credit_card_response ===>", credit_card_response)

    paginate_transactions_response = (
        await get_transactions_by_card_number_controller.handle(
            credit_card_number="1234567"
        )
    )

    print("paginate_transactions_response ===>", paginate_transactions_response)

    transaction_dto = hydrate_transaction_dto(
        dto=TransactionCreateDto(
            amount=10,
            store="someStore",
            description="example transaction",
            name="Jonh Doe",
            number="12345678",
            expirationMonth=8,
            expirationYear=2024,
            CVV=123,
        )
    )

    create_transaction_response = await create_transaction_controller.handle(
        transaction_dto=transaction_dto
    )

    print("create_transaction_response ===>", create_transaction_response)

    updated_paginate_transactions_response = (
        await get_transactions_by_card_number_controller.handle(
            credit_card_number="1234567"
        )
    )

    print(
        "updated_paginate_transactions_response ===>",
        updated_paginate_transactions_response,
    )

    updated_credit_card_response = (
        await get_credit_card_by_number_usecase.get_credit_card_by_number(
            credit_card_number="12345678"
        )
    )
    print("updated_credit_card_response ===>", updated_credit_card_response)

    await db_session().close()


run(main())
