import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from "../../users/entities/user.entity"

export class AuthEntity {
  @ApiProperty({
    type: String,
  })
  token: string;

  @ApiProperty({
    type: UserEntity,
  })
  user: UserEntity;
}
