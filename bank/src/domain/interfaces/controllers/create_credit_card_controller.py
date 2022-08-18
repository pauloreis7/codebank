from abc import ABC, abstractmethod

from src.domain.pydantic.models.CreditCard import CreditCardCreateDto


class CreateCreditCardControllerInterface(ABC):
    """Create Credit Card Controller Interface"""

    @abstractmethod
    async def handle(self, credit_card_dto: CreditCardCreateDto):
        """Method to handle request"""

        raise Exception("Must implement handler method")
