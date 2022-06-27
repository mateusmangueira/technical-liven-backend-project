import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicRoute } from '../auth/decorators/public-route.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @PublicRoute()
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() usersFilter: CreateUserDto) {
    return await this.usersService.findAll(usersFilter);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':_id')
  async findOne(@Param('_id') _id: string) {
    return await this.usersService.findOne(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':_id')
  async update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(_id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':_id')
  async remove(@Param('_id') _id: string) {
    return await this.usersService.remove(_id);
  }
}
