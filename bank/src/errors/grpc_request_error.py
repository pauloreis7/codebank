from grpc import StatusCode


class GrpcRequestError(Exception):
    """Grpc error class"""

    def __init__(
        self,
        code: StatusCode,
        message: str,
    ) -> None:
        super().__init__(code, message)

        self.code = code
        self.message = message
