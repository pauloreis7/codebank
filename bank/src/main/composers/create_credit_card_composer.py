from sqlalchemy.ext.asyncio import AsyncSession

from src.infra.repositories.credit_cards_repository import CreditCardsRepository
from src.infra.kafka.producer_kafka import KafkaProducerProvider

from src.domain.usecases.create_credit_card_usecase import CreateCreditCardUsecase
from src.presenters.controllers.create_credit_card_controller import (
    CreateCreditCardController,
)


def create_credit_card_composer(db_session: AsyncSession):
    """create credit card composer"""

    infra = CreditCardsRepository(db_session)
    message_producer = KafkaProducerProvider()
    use_case = CreateCreditCardUsecase(infra, message_producer)
    controller = CreateCreditCardController(use_case)

    return controller
