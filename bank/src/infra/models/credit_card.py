from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from src.infra.config.db_connection_base import Base


class CreditCard(Base):
    """Class to CreditCard entity"""

    __tablename__ = "credit_cards"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    name = Column(String(50), nullable=False)
    number = Column(String(50), nullable=False)
    expiration_month = Column(Integer, nullable=False)
    expiration_year = Column(Integer, nullable=False)
    CVV = Column(Integer, nullable=False)
    balance = Column(Float, nullable=False)
    limit = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    transactions = relationship(
        "Transaction", back_populates="credit_card", cascade="all, delete"
    )

    def __repr__(self) -> str:
        return f"CreditCard [{self.id}, name {self.name}]"
