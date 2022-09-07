from typing import Type
from grpc.aio import ServicerContext

from src.presenters.controllers.create_credit_card_controller import (
    CreateCreditCardController,
)
from src.domain.dtos.models.CreditCard import CreditCardCreateDto
from src.errors.grpc_request_error import GrpcRequestError

from src.infra.grpc.pb.credit_card_pb2_grpc import CreateCreditCardServiceServicer
from src.infra.grpc.pb.credit_card_pb2 import (
    CreateCreditCardRequest,
    google_dot_protobuf_dot_empty__pb2,
)


class CreateCreditCardService(CreateCreditCardServiceServicer):
    def __init__(
        self, create_credit_card_controller: Type[CreateCreditCardController]
    ) -> None:
        self.__controller = create_credit_card_controller

    async def CreateCreditCard(
        self,
        request: CreateCreditCardRequest,
        context: ServicerContext,
    ) -> google_dot_protobuf_dot_empty__pb2.Empty():

        credit_card_dto = CreditCardCreateDto(name=request.name)

        try:
            await self.__controller.handle(credit_card_dto=credit_card_dto)

            return google_dot_protobuf_dot_empty__pb2.Empty()
        except GrpcRequestError as error:
            context.set_code(error.code)
            context.set_details(error.message)

            return google_dot_protobuf_dot_empty__pb2.Empty()
