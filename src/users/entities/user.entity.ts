import { AddressEntity } from "src/addresses/entities/address.entity";

export class UserEntity {
  id: number;
  name: string;
  email: string;
  address?: AddressEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
