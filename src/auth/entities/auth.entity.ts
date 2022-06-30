import { UserEntity } from "../../users/entities/user.entity"

export class AuthEntity {
  token: string;
  user: UserEntity;
}
