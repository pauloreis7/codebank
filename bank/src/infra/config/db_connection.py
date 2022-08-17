from typing import AsyncGenerator
from urllib.error import HTTPError

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

SQLALCHEMY_DATABASE_URL = (
    "postgresql+asyncpg://postgres:c011f0ae@postgres-db:5432/postgres"
)


def create_database_engine(connection_string: str):
    """Create database async engine function"""

    engine = create_async_engine(connection_string)

    return engine


async def setup_db_connection() -> AsyncGenerator:
    """Setup database session to query"""

    engine = create_database_engine(SQLALCHEMY_DATABASE_URL)

    session = sessionmaker(
        engine, expire_on_commit=True, future=True, class_=AsyncSession
    )

    async with session() as session:
        try:
            yield session
            await session.commit()

        except SQLAlchemyError as sql_alchemy_exc:
            await session.rollback()
            raise sql_alchemy_exc

        except HTTPError as http_exc:
            await session.rollback()
            raise http_exc

        finally:
            await session.close()
