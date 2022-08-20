from grpc.aio import server
from asyncio import run
from logging import info, basicConfig, INFO
from os import getenv
from dotenv import load_dotenv

from src.main.composers.create_transaction_composer import create_transaction_composer
from src.infra.grpc.pb.payment_pb2_grpc import add_PaymentServiceServicer_to_server
from src.infra.grpc.services.payment_service import PaymentService
from src.infra.config.db_connection import setup_db_session

load_dotenv()

GRPC_PORT = getenv("GRPC_PORT")


async def serve() -> None:
    grpc_server = server()

    db_session = await setup_db_session()

    create_transaction_controller = create_transaction_composer(db_session=db_session)

    transaction_service = PaymentService(create_transaction_controller)

    add_PaymentServiceServicer_to_server(transaction_service, grpc_server)

    listen_addr = f"[::]:{GRPC_PORT}"

    grpc_server.add_insecure_port(listen_addr)

    info("Starting grpc_server on %s", listen_addr)

    await grpc_server.start()
    await grpc_server.wait_for_termination()


if __name__ == "__main__":
    basicConfig(level=INFO)
    run(serve())
