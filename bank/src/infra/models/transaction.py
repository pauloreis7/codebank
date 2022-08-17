from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column, Float, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from src.infra.models.credit_card import CreditCard
from src.infra.config.db_connection_base import Base


class Transaction(Base):
    """Class to Transaction entity"""

    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    amount = Column(Float, nullable=False)
    status = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    store = Column(String(50), nullable=False)
    credit_card_id = Column(
        UUID(as_uuid=True),
        ForeignKey("credit_cards.id", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=False,
    )
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    credit_card = relationship(CreditCard)

    def __repr__(self) -> str:
        return f"Transaction [{self.id}, amount {self.amount}]"
