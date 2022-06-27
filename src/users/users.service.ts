import { genSalt, hash } from 'bcryptjs';

import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/database/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private salt: string;
  constructor(
    private prisma: PrismaService,
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
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    });

    if (user) {
      throw new BadRequestException('User already exists, try Login or another Email to register');
    }
    const { id, name, email } = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, this.salt),
      }
    })

    return new UserEntity({
      id,
      name,
      email,
    });
  }

  async findAll(usersFilter: CreateUserDto) {
    const { name, email } = usersFilter
    return await this.prisma.user.findMany({
      where: {
        name,
        email,
      },
      include: {
        Address: true
      }
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id
      },
      data: updateUserDto
    })
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}