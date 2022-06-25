import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Address } from '../../addresses/entities/address.entity';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  address: Address;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
