import { UserEntity } from "src/users/entities/user.entity"

export class AuthEntity {
  token: string;
  user: UserEntity;
}
