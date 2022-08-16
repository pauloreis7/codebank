from datetime import datetime


class CreditCard:
    """CreditCard Base Model"""

    id: str
    name: str
    number: str
    expirationMonth: int
    expirationYear: int
    CVV: int
    balance: float
    limit: float
    createdAt: datetime
