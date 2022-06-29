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
  async findAllFilters(@Query() usersFilter: CreateUserDto) {
    return await this.usersService.findAllFilters(usersFilter);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') _id: number) {
    const { id, name, email } = await this.usersService.findOne(+_id)
    return {
      id,
      name,
      email
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') _id: number, @Body() updateUserDto: UpdateUserDto) {
    const { id, name, email } = await this.usersService.update(+_id, updateUserDto);
    return {
      id,
      name,
      email
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') _id: number) {
    const { id, name, email } = await this.usersService.remove(+_id);
    return {
      id, name, email
    }
  }
}
