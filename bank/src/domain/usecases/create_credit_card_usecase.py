from typing import Type
from random import randint
from datetime import datetime
from json import dumps
from os import getenv
from unicodedata import name
from dotenv import load_dotenv

from src.domain.models.credit_card import CreditCard
from src.domain.dtos.models.CreditCard import CreditCardCreateDto
from src.domain.interfaces.repositories.credit_cards_repository import (
    CreditCardsRepositoryInterface,
)
from src.domain.interfaces.providers.message_producer_provider import (
    MessageProducerProviderInterface,
)

load_dotenv()

KAFKA_BOOTSTRAP_SERVERS = getenv("KAFKA_BOOTSTRAP_SERVERS")
KAFKA_CREATED_CREDIT_CARDS_TOPIC = getenv("KAFKA_CREATED_CREDIT_CARDS_TOPIC")


class CreateCreditCardUsecase:
    """Create credit card usecase"""

    def __init__(
        self,
        credit_cards_repository: Type[CreditCardsRepositoryInterface],
        message_producer_provider: Type[MessageProducerProviderInterface],
    ) -> None:
        self.__credit_cards_repository = credit_cards_repository
        self.__message_producer_provider = message_producer_provider

    async def create_credit_card(self, credit_card_dto: CreditCardCreateDto):
        """
        Create credit_card model
        :param  - credit_card_dto: Credit card data for create
        :returns - None for create credit_card event status
        """

        credit_card = CreditCard()

        credit_cards_count = (
            await self.__credit_cards_repository.get_credit_cards_count()
        )

        credit_card_number_length = 16 - len(str(credit_cards_count))
        credit_card_random_number = random_number_to_fixed_length(
            credit_card_number_length
        )
        formatted_credit_card_number = (
            f"{str(credit_card_random_number)}{credit_cards_count}"
        )
        current_month = int(datetime.now().strftime("%m"))
        credit_card_expiration_year = datetime.now().year + 5
        credit_card_random_cvv = random_number_to_fixed_length(3)

        credit_card.name = credit_card_dto.name.upper()
        credit_card.number = formatted_credit_card_number
        credit_card.expiration_month = current_month
        credit_card.expiration_year = credit_card_expiration_year
        credit_card.CVV = credit_card_random_cvv
        credit_card.balance = 0
        credit_card.limit = 1000.00

        response = await self.__credit_cards_repository.create_credit_card(
            credit_card=credit_card
        )

        created_credit_card_message = {
            "credit_card_number": credit_card.number,
            "credit_card_name": credit_card.name,
            "credit_card_expiration_month": str(credit_card.expiration_month),
            "credit_card_expiration_year": str(credit_card.expiration_year),
            "credit_card_CVV": str(credit_card.CVV),
            "credit_card_balance": str(credit_card.balance),
            "credit_card_limit": str(credit_card.limit),
            "issue_date": str(credit_card.created_at),
        }

        serialized_message = dumps(created_credit_card_message)

        self.__message_producer_provider.publish(
            bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
            topic=KAFKA_CREATED_CREDIT_CARDS_TOPIC,
            message=serialized_message,
        )

        formatted_response = {
            "credit_card_number": created_credit_card_message["credit_card_number"],
            "credit_card_name": created_credit_card_message["credit_card_name"],
            "credit_card_expiration_month": created_credit_card_message[
                "credit_card_expiration_month"
            ],
            "credit_card_expiration_year": created_credit_card_message[
                "credit_card_expiration_year"
            ],
            "credit_card_CVV": created_credit_card_message["credit_card_CVV"],
        }

        return formatted_response


def random_number_to_fixed_length(number_length):
    range_start = 10 ** (number_length - 1)
    range_end = (10**number_length) - 1

    return randint(range_start, range_end)
