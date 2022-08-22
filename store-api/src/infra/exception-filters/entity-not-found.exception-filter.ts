import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { Prisma } from '@prisma/client'

@Catch(Prisma.NotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.NotFoundError, host: ArgumentsHost) {
    const context = host.switchToHttp()

    const response = context.getResponse<Response>()

    return response.status(404).json({
      error: 'Not Found',
      message: exception.message
    })
  }
}
