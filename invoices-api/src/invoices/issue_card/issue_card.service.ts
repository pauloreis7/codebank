import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc, RpcException } from '@nestjs/microservices'
import { Observable, lastValueFrom } from 'rxjs'

type createCreditCardData = {
  name: string
}

type CreateCreditCardResponse = {
  credit_card_number: string
  credit_card_name: string
  credit_card_expiration_month: string
  credit_card_expiration_year: string
  credit_card_CVV: string
}

interface IssueCardGrpcService {
  createCreditCard(
    data: createCreditCardData
  ): Observable<CreateCreditCardResponse>
}

@Injectable()
export class IssueCardService implements OnModuleInit {
  private issueCardGrpcService: IssueCardGrpcService

  constructor(@Inject('CREDIT_CARD_PACKAGE') private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.issueCardGrpcService =
      this.clientGrpc.getService<IssueCardGrpcService>(
        'CreateCreditCardService'
      )
  }

  async issueCard(data: createCreditCardData) {
    try {
      const grpcResponse = await lastValueFrom(
        this.issueCardGrpcService.createCreditCard(data)
      )

      return grpcResponse
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message
      })
    }
  }
}
