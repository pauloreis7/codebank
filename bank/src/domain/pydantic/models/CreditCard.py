from pydantic import BaseModel


class CreditCardBase(BaseModel):
    """CreditCard Base model"""

    name: str
    number: str
    expiration_month: int
    expiration_year: int
    CVV: int
    balance: float
    limit: float


class CreditCardCreate(CreditCardBase):
    """Create credit card Model data"""
