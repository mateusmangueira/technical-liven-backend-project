import { ApiProperty } from '@nestjs/swagger';
export class AddressEntity {

  @ApiProperty({
    type: Number,
  })
  id: number

  @ApiProperty({
    type: String,
  })
  street: string

  @ApiProperty({
    type: String,
  })
  street_number: string

  @ApiProperty({
    type: String,
  })
  neighborhood: string

  @ApiProperty({
    type: String,
  })
  city: string

  @ApiProperty({
    type: String,
  })
  state: string

  @ApiProperty({
    type: String,
  })
  country: string

  @ApiProperty({
    type: String,
  })
  postCode: string

  @ApiProperty({
    type: Number,
  })
  userId: number

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
