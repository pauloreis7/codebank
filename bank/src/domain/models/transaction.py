from datetime import datetime
from uuid import uuid4, UUID


class Transaction:
    """Transaction Base Model"""

    def __init__(self) -> None:
        self.id = uuid4()
        self.created_at = datetime.now()

    id: UUID
    amount: float
    status: str
    description: str
    store: str
    credit_card_id: str
    created_at: datetime
