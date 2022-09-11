class TransactionCreateDto:
    """Create transaction Model data"""

    amount: float
    store: str
    description: str
    name: str
    number: str
    expirationMonth: int
    expirationYear: int
    CVV: int
