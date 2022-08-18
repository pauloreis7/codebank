from pydantic import BaseModel


class TransactionBase(BaseModel):
    """Transaction Base Model"""

    amount: float
    store: str
    description: str


class TransactionCreateDto(TransactionBase):
    """Create transaction Model data"""

    name: str
    number: str
    expirationMonth: int
    expirationYear: int
    CVV: int
