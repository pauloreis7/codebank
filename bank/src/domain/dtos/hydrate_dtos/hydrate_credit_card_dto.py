from src.domain.dtos.models.CreditCard import CreditCardCreateDto


def hydrate_credit_card_dto(dto: CreditCardCreateDto):

    credit_card_dto = CreditCardCreateDto(
        name=dto.name,
        number=dto.number,
        expiration_month=dto.expiration_month,
        expiration_year=dto.expiration_year,
        CVV=dto.CVV,
        balance=dto.balance,
        limit=dto.limit,
    )

    return credit_card_dto
