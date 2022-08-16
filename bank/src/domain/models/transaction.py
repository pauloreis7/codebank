from datetime import datetime
from uuid import uuid1, UUID


class Transaction:
    """Transaction Base Model"""

    def __init__(self) -> None:
        self.id = uuid1()
        self.createdAt = datetime.now()

    id: UUID
    amount: float
    status: str
    description: str
    store: str
    creditCardId: str
    createdAt: datetime
