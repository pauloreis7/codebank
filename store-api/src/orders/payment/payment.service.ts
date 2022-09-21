import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc, RpcException } from '@nestjs/microservices'
import { Observable, lastValueFrom } from 'rxjs'

interface PaymentData {
  creditCard: {
    number: string
    name: string
    expirationMonth: number
    expirationYear: number
    cvv: string
  }
  amount: number
  description: string
  store: string
}

type PaymentResponse = {
  status: 'approved' | 'rejected'
}

interface PaymentGrpcService {
  payment(data: PaymentData): Observable<PaymentResponse>
}

@Injectable()
export class PaymentService implements OnModuleInit {
  private paymentGrpcService: PaymentGrpcService

  constructor(@Inject('PAYMENT_PACKAGE') private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.paymentGrpcService =
      this.clientGrpc.getService<PaymentGrpcService>('PaymentService')
  }

  async payment(data: PaymentData) {
    try {
      const grpcResponse = await lastValueFrom(
        this.paymentGrpcService.payment(data)
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
