import { Type } from 'class-transformer'
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
  IsIn
} from 'class-validator'

const invoicesStatus = ['approved', 'rejected']

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  transaction_id: string

  @IsString()
  @IsNotEmpty()
  credit_card_number: string

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  store: string

  @MaxLength(255)
  @IsString()
  @IsIn(invoicesStatus)
  status: string

  @IsString()
  @IsNotEmpty()
  description: string

  @MaxLength(255)
  @IsISO8601()
  @IsNotEmpty()
  payment_date: string
}

export class KafkaCreateInvoiceDto {
  @Type(() => CreateInvoiceDto)
  @ValidateNested()
  @IsObject()
  @IsNotEmpty()
  value: CreateInvoiceDto
}
