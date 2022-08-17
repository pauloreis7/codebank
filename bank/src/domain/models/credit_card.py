from datetime import datetime
from uuid import uuid4, UUID


class CreditCard:
    """CreditCard Base Model"""

    def __init__(self) -> None:
        self.id = uuid4()
        self.createdAt = datetime.now()

    id: UUID
    name: str
    number: str
    expirationMonth: int
    expirationYear: int
    CVV: int
    balance: float
    limit: float
    createdAt: datetime