from typing import List

from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import parse_obj_as

from src.infra.pydantic.models.Transaction import TransactionSchema
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
    ) -> List[TransactionSchema]:
        """Get all transactions list"""

        async with self.db_session() as session:

            query = select(Transaction).offset(skip).limit(limit)

            query_response = await session.execute(query)

            transactions = query_response.scalars().all()

            transactions_schema = parse_obj_as(List[TransactionSchema], transactions)

            return transactions_schema

    async def create_transaction(self, transaction: TransactionSchema) -> None:
        """Create a transaction"""

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
