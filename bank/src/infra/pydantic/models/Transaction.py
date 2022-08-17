from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class TransactionBase(BaseModel):
    """Transaction Base Model"""

    id: UUID
    amount: float
    status: str
    description: str
    store: str
    credit_card_id: str
    created_at: datetime
