import { Model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import constants from './constants/constants';

@Injectable()
export class UsersService {
  private salt: string;
  constructor(
    @Inject(constants().userProvide)
    private userModel: Model<User>,
  ) {
    this.initializeSalt();
  }

  async initializeSalt() {
    if (isNaN(Number(process.env.DEFAULT_SALT_ROUNDS))) {
      throw new Error('Invalid salt rounds');
    }
    this.salt = await genSalt(Number(process.env.DEFAULT_SALT_ROUNDS));
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto)
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}