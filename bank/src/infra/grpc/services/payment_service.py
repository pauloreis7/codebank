from typing import Type
from grpc.aio import ServicerContext

from src.presenters.controllers.create_transaction_controller import (
    CreateTransactionController,
)
from src.domain.dtos.models.Transaction import TransactionCreateDto
from src.errors.grpc_request_error import GrpcRequestError

from src.infra.grpc.pb.payment_pb2_grpc import PaymentServiceServicer
from src.infra.grpc.pb.payment_pb2 import (
    PaymentRequest,
    google_dot_protobuf_dot_empty__pb2,
)


class PaymentService(PaymentServiceServicer):
    def __init__(
        self, create_transaction_controller: Type[CreateTransactionController]
    ) -> None:
        self.__controller = create_transaction_controller

    async def Payment(
        self,
        request: PaymentRequest,
        context: ServicerContext,
    ) -> google_dot_protobuf_dot_empty__pb2.Empty():

        transaction_dto = TransactionCreateDto(
            name=request.creditCard.name,
            number=request.creditCard.number,
            expirationMonth=request.creditCard.expirationMonth,
            expirationYear=request.creditCard.expirationYear,
            CVV=request.creditCard.cvv,
            amount=request.amount,
            store=request.store,
            description=request.description,
        )

        try:
            await self.__controller.handle(transaction_dto=transaction_dto)

            return google_dot_protobuf_dot_empty__pb2.Empty()
        except GrpcRequestError as error:
            context.set_code(error.code)
            context.set_details(error.message)

            return google_dot_protobuf_dot_empty__pb2.Empty()
