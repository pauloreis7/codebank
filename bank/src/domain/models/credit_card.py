from datetime import datetime
from uuid import uuid4, UUID


class CreditCard:
    """CreditCard Base Model"""

    def __init__(self) -> None:
        self.id = uuid4()
        self.created_at = datetime.now()

    id: UUID
    name: str
    number: str
    expiration_month: int
    expiration_year: int
    CVV: int
    balance: float
    limit: float
    created_at: datetime
