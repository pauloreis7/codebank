from typing import List

from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from src.infra.pydantic.models.Transaction import TransactionBase
from src.infra.models.transaction import Transaction
from src.domain.interfaces.transactions_repository import (
    TransactionsRepositoryInterface,
)


class TransactionsRepository(TransactionsRepositoryInterface):
    """Class to transactions repository"""

    def __init__(self, db_session: AsyncSession) -> None:
        self.db_session = db_session

    async def get_transactions(
        self, skip: int = 0, limit: int = 100
    ) -> List[TransactionBase]:
        """Get all transactions list"""

        async with self.db_session() as session:

            query = select(Transaction).offset(skip).limit(limit)

            query_response = await session.execute(query)

            transactions = query_response.scalars().all()

            return transactions

    async def create_transaction(self, transaction: TransactionBase) -> None:
        """Create transaction"""

        async with self.db_session() as session:

            query = insert(Transaction).values(
                id=transaction.id,
                amount=transaction.amount,
                status=transaction.status,
                description=transaction.description,
                store=transaction.store,
                credit_card_id=transaction.credit_card_id,
                created_at=transaction.created_at,
            )

            await session.execute(query)

            await session.commit()

            return
