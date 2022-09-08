import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsISO8601
} from 'class-validator'

export class CreateCreditCardDto {
  @MaxLength(16)
  @MinLength(16)
  @IsString()
  @IsNotEmpty()
  credit_card_number: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  credit_card_name: string

  @MaxLength(2)
  @IsString()
  @IsNotEmpty()
  credit_card_expiration_month: string

  @MaxLength(4)
  @IsString()
  @IsNotEmpty()
  credit_card_expiration_year: string

  @MaxLength(4)
  @IsString()
  @IsNotEmpty()
  credit_card_CVV: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  credit_card_balance: string

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  credit_card_limit: string

  @MaxLength(255)
  @IsISO8601()
  @IsNotEmpty()
  issue_date: string
}
