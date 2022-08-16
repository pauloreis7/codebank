from datetime import datetime


class Transaction:
    """Transaction Base Model"""

    id: str
    amount: float
    status: str
    description: str
    store: str
    creditCardId: str
    createdAt: datetime
