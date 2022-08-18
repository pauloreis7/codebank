from os import getenv
from dotenv import load_dotenv

from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

load_dotenv()

SQLALCHEMY_DATABASE_URL = getenv("DATABASE_URL")


def create_database_engine(connection_string: str):
    """Create database async engine function"""

    engine = create_async_engine(connection_string)

    return engine


async def setup_db_session() -> AsyncSession:
    """Setup database session to query"""

    engine = create_database_engine(SQLALCHEMY_DATABASE_URL)

    session = sessionmaker(
        engine, expire_on_commit=True, future=True, class_=AsyncSession
    )

    return session
