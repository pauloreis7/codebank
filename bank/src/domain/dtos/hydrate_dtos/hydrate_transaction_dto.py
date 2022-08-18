from src.domain.dtos.models.Transaction import TransactionCreateDto


def hydrate_transaction_dto(dto: TransactionCreateDto):

    transaction_dto = TransactionCreateDto(
        amount=dto.amount,
        store=dto.store,
        description=dto.description,
        name=dto.name,
        number=dto.number,
        expirationMonth=dto.expirationMonth,
        expirationYear=dto.expirationYear,
        CVV=dto.CVV,
    )

    return transaction_dto
