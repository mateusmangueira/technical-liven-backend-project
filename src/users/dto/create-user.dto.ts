import { Address } from '@prisma/client';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  address: Address[];

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
