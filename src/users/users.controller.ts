import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  async findAll(@Query() usersFilter: CreateUserDto) {
    return await this.usersService.findAll(usersFilter);
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string) {
    return await this.usersService.findOne(_id);
  }

  @Patch(':_id')
  async update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(_id, updateUserDto);
  }

  @Delete(':_id')
  async remove(@Param('_id') _id: string) {
    return await this.usersService.remove(_id);
  }
}
