import { Address } from "@prisma/client";

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  address?: Address[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
