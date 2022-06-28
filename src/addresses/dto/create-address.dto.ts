import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  street: string;

  @IsOptional()
  street_number: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  country: string;

  @IsNotEmpty()
  postCode: string;

  userId: number

  constructor(partial: Partial<CreateAddressDto>) {
    Object.assign(this, partial);
  }
}
