import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateCreditCardDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @MaxLength(16)
  @MinLength(16)
  @IsString()
  @IsNotEmpty()
  number: string
}
