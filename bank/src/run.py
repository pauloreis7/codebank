from asyncio import run
from logging import basicConfig, INFO
from grpc.aio import insecure_channel
from os import getenv
from dotenv import load_dotenv

from src.infra.grpc.pb import payment_pb2_grpc
from src.infra.grpc.pb import payment_pb2
from src.infra.grpc.pb import credit_card_pb2_grpc
from src.infra.grpc.pb import credit_card_pb2

from src.infra.config.db_connection import setup_db_session


load_dotenv()

GRPC_PORT = getenv("GRPC_PORT")
GRPC_HOST = getenv("GRPC_HOST")


async def main():
    db_session = await setup_db_session()

    grpc_target = f"{GRPC_HOST}:{GRPC_PORT}"

    async with insecure_channel(grpc_target) as channel:
        stub_payment = payment_pb2_grpc.PaymentServiceStub(channel)
        stub_create_credit_card = credit_card_pb2_grpc.CreateCreditCardServiceStub(
            channel
        )

        credit_card = {
            "name": "PAULO SILVA DOS REIS",
            "number": "1234567891234567",
            "expirationMonth": 8,
            "expirationYear": 2026,
            "cvv": 123,
        }

        response_create_credit_card = await stub_create_credit_card.CreateCreditCard(
            request=credit_card_pb2.CreateCreditCardRequest(name="paulo silva dos reis")
        )

        # response_payment = await stub_payment.Payment(
        #     request=payment_pb2.PaymentRequest(
        #         creditCard=credit_card,
        #         amount=10,
        #         store="CodeStore",
        #         description="Example desc...",
        #     )
        # )

        print("gRPC client received: ", response_create_credit_card)
        # print("gRPC client received: ", response_payment)

    await db_session().close()


if __name__ == "__main__":
    basicConfig(level=INFO)
    run(main())
