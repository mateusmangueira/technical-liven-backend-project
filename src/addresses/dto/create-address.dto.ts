import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateAddressDto {
  @IsNotEmpty()
  street: string;

  @IsOptional()
  number: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  postCode: string;

  @IsNotEmpty()
  user: User;

  constructor(partial: Partial<CreateAddressDto>) {
    Object.assign(this, partial);
  }
}
