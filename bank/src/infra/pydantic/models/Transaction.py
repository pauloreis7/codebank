from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class TransactionBase(BaseModel):
    """Transaction Base Model"""

    amount: float
    status: str
    description: str
    store: str
    credit_card_id: UUID


class TransactionSchema(TransactionBase):
    """Transaction Model read"""

    id: UUID
    created_at: datetime

    class Config:
        """Orm serialized read"""

        orm_mode = True
