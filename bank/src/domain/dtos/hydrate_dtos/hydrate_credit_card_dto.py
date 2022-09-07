from src.domain.dtos.models.CreditCard import CreditCardCreateDto


def hydrate_credit_card_dto(dto: CreditCardCreateDto):

    credit_card_dto = CreditCardCreateDto(name=dto.name)

    return credit_card_dto
