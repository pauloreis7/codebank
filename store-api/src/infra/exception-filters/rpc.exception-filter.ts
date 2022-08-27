import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Response } from 'express'

const grpcErrorsToHttpStatusList = {
  11: 400,
  16: 401,
  14: 503,
  9: 422,
  5: 404
}

type ExceptionErrorObj = { code: number }

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    console.error(exception)

    const code =
      typeof exception.getError() === 'object'
        ? (exception.getError() as ExceptionErrorObj).code
        : 11

    const statusError = grpcErrorsToHttpStatusList[code]

    return response.status(statusError).json({
      message: exception.message
    })
  }
}
