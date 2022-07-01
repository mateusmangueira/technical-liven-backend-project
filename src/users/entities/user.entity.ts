import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from "src/addresses/entities/address.entity";

export class UserEntity {

  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({ type: [AddressEntity] })
  address?: AddressEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
