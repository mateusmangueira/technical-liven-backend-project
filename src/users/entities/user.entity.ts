import { Address } from "src/schemas/addresses/address.schema";

export class UserEntity {
  name: string;
  email: string;
  password: string;
  address: Address[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
