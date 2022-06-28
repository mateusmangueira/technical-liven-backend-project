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
      },
      include: {
        Address: true,
      }
    })

    if (user) {
      throw new BadRequestException('User already exists, try Login or another Email to register');
    }

    const { id, name, email, Address } = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, this.salt),
      },
      include: {
        Address: true,
      }
    })

    return new UserEntity({
      id,
      name,
      email,
      address: Address,
    });
  }

  async findAll(usersFilter: CreateUserDto) {
    const { name, email } = usersFilter
    const users = await this.prisma.user.findMany({
      where: {
        name,
        email,
      },
      include: {
        Address: true
      },
    });

    return users.map(({ id, name, email, Address }) => new UserEntity({ id, email, name, address: Address }));
  }

  async findOne(_id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: _id
        }
      })
    } catch (error) {
      throw new BadRequestException(error);
    }

  }

  async update(_id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id: _id
        },
        data: updateUserDto
      })
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  async remove(_id: number) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: _id
        }
      })
    } catch (error) {
      throw new BadRequestException(error)
    }

  }
}