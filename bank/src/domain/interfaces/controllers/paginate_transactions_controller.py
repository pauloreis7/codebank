from abc import ABC, abstractmethod


class PaginateTransactionsControllerInterface(ABC):
    """Paginate Transactions Controller Interface"""

    @abstractmethod
    async def handle(self, skip: int = 0, limit: int = 100):
        """Method to handle request"""

        raise Exception("Must implement handler method")
