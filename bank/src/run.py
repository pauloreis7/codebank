from asyncio import run

from src.infra.config.db_connection import setup_db_session
from src.infra.repositories.credit_cards_repository import CreditCardsRepository

from src.main.composers.create_credit_card_composer import (
    create_credit_card_composer,
)
from src.main.composers.create_transaction_composer import (
    create_transaction_composer,
)
from src.main.composers.get_transactions_by_card_number_composer import (
    get_transactions_by_card_number_composer,
)

from src.domain.dtos.models.CreditCard import CreditCardCreateDto
from src.domain.dtos.models.Transaction import TransactionCreateDto
from src.domain.dtos.hydrate_dtos.hydrate_credit_card_dto import (
    hydrate_credit_card_dto,
)
from src.domain.dtos.hydrate_dtos.hydrate_transaction_dto import (
    hydrate_transaction_dto,
)

from src.domain.usecases.get_credit_card_by_number_usecase import (
    GetCreditCardByNumberUsecase,
)


async def main():
    db_session = await setup_db_session()

    credit_cards_infra = CreditCardsRepository(db_session)
    get_credit_card_by_number_usecase = GetCreditCardByNumberUsecase(credit_cards_infra)

    create_credit_card_controller = create_credit_card_composer(db_session=db_session)
    get_transactions_by_card_number_controller = (
        get_transactions_by_card_number_composer(db_session=db_session)
    )
    create_transaction_controller = create_transaction_composer(db_session=db_session)

    credit_card_dto = hydrate_credit_card_dto(
        dto=CreditCardCreateDto(
            name="Jonh Doe",
            number="123456",
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
            credit_card_number="123456"
        )
    )
    print("credit_card_response ===>", credit_card_response)

    transactions_pagination_response = (
        await get_transactions_by_card_number_controller.handle(
            credit_card_number="123456"
        )
    )

    print("transactions_pagination_response ===>", transactions_pagination_response)

    transaction_dto = hydrate_transaction_dto(
        dto=TransactionCreateDto(
            amount=10,
            store="someStore",
            description="example transaction",
            name="Jonh Doe",
            number="123456",
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
            credit_card_number="123456"
        )
    )

    print(
        "updated_paginate_transactions_response ===>",
        updated_paginate_transactions_response,
    )

    updated_credit_card_response = (
        await get_credit_card_by_number_usecase.get_credit_card_by_number(
            credit_card_number="123456"
        )
    )
    print("updated_credit_card_response ===>", updated_credit_card_response)

    await db_session().close()


run(main())
