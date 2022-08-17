from uuid import UUID
from sqlalchemy import select, insert, update
from sqlalchemy.ext.asyncio import AsyncSession

from src.infra.pydantic.models.CreditCard import CreditCardSchema
from src.infra.models.credit_card import CreditCard
from src.domain.interfaces.credit_cards_repository import CreditCardsRepositoryInterface


class CreditCardsRepository(CreditCardsRepositoryInterface):
    """Class to credit_cards repository"""

    def __init__(self, db_session: AsyncSession) -> None:
        self.db_session = db_session

    async def get_credit_card_by_number(
        self, credit_card_number: str
    ) -> CreditCardSchema:
        """Get a credit card by it's number"""

        async with self.db_session() as session:

            query = select(CreditCard).where(CreditCard.number == credit_card_number)

            query_response = await session.execute(query)

            credit_card = query_response.scalars().first()

            credit_card_schema = CreditCardSchema.from_orm(credit_card)

            return credit_card_schema

    async def create_credit_card(self, credit_card: CreditCardSchema) -> None:
        """Create a credit card"""

        async with self.db_session() as session:

            query = insert(CreditCard).values(
                id=credit_card.id,
                name=credit_card.name,
                number=credit_card.number,
                expirationMonth=credit_card.expirationMonth,
                expirationYear=credit_card.expirationYear,
                CVV=credit_card.CVV,
                balance=credit_card.balance,
                limit=credit_card.limit,
                created_at=credit_card.created_at,
            )

            await session.execute(query)

            await session.commit()

            return

    async def patch_credit_card_balance(
        self, credit_card_id: UUID, updated_balance: float
    ) -> None:
        """Patch a credit card balance"""

        async with self.db_session() as session:

            query = (
                update(CreditCard)
                .where(CreditCard.id == credit_card_id)
                .values(
                    balance=updated_balance,
                )
            )

            await session.execute(query)

            await session.commit()

            return
