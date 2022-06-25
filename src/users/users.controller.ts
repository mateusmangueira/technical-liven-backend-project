import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    const { name, email, password, address } = createUserDto;
    return await this.usersService.createUser({
      name,
      email,
      password,
      address,
    });
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
