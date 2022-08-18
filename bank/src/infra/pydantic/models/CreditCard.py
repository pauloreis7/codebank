from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class CreditCardBase(BaseModel):
    """CreditCard Base Model"""

    name: str
    number: str
    expiration_month: int
    expiration_year: int
    CVV: int
    balance: float
    limit: float


class CreditCardSchema(CreditCardBase):
    """CreditCard Model read"""

    id: UUID
    created_at: datetime

    class Config:
        """Orm serialized read"""

        orm_mode = True
