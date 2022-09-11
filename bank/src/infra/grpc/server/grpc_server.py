from logging import info
from os import getenv
from grpc.aio import server
from dotenv import load_dotenv

from src.main.composers.create_transaction_composer import create_transaction_composer
from src.main.composers.create_credit_card_composer import create_credit_card_composer
from src.infra.grpc.pb.payment_pb2_grpc import add_PaymentServiceServicer_to_server
from src.infra.grpc.pb.credit_card_pb2_grpc import (
    add_CreateCreditCardServiceServicer_to_server,
)
from src.infra.grpc.services.payment_service import PaymentService
from src.infra.grpc.services.create_credit_card_service import CreateCreditCardService
from src.infra.config.db_connection import setup_db_session

load_dotenv()

GRPC_PORT = getenv("GRPC_PORT")


async def serve() -> None:
    """Serve gRPC server"""

    grpc_server = server()

    db_session = await setup_db_session()

    create_transaction_controller = create_transaction_composer(db_session=db_session)
    create_credit_card_controller = create_credit_card_composer(db_session=db_session)

    transaction_service = PaymentService(create_transaction_controller)
    create_credit_card_service = CreateCreditCardService(create_credit_card_controller)

    add_PaymentServiceServicer_to_server(transaction_service, grpc_server)
    add_CreateCreditCardServiceServicer_to_server(
        create_credit_card_service, grpc_server
    )

    listen_addr = f"[::]:{GRPC_PORT}"

    grpc_server.add_insecure_port(listen_addr)

    info("Starting grpc_server on %s", listen_addr)

    await grpc_server.start()
    await grpc_server.wait_for_termination()
