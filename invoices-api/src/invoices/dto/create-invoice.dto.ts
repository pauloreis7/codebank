import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min
} from 'class-validator'

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  credit_card_number: string

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsISO8601()
  @IsNotEmpty()
  payment_date: Date

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  store: string

  @IsString()
  @IsNotEmpty()
  description: string
}
