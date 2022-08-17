from datetime import datetime
from uuid import uuid4, UUID


class Transaction:
    """Transaction Base Model"""

    def __init__(self) -> None:
        self.id = uuid4()
        self.createdAt = datetime.now()

    id: UUID
    amount: float
    status: str
    description: str
    store: str
    creditCardId: str
    createdAt: datetime
