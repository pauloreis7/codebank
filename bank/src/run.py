from asyncio import run
from logging import basicConfig, INFO

from src.infra.grpc.server.grpc_server import serve

if __name__ == "__main__":
    basicConfig(level=INFO)
    run(serve())
