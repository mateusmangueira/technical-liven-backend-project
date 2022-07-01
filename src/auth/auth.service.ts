import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';

import * as bcrypt from 'bcryptjs';
import jwtConstants from './constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
  }

  async login(createAuthDto: CreateAuthDto) {
    const { emailLogin, passwordLogin } = createAuthDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email: emailLogin,
      },
    })

    if (!user) {
      throw new BadRequestException('User is not registered, try another Email')
    }

    const passwordMatched = await bcrypt.compare(passwordLogin, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Password incorrect, please try again!');
    }

    const { id, name, email } = user

    const tokenPayload = {
      sub: id,
      name: name,
      email: email,
    }

    const token = this.jwtService.sign(tokenPayload, {
      secret: jwtConstants().secret,
      expiresIn: jwtConstants().expirationTime
    });

    return {
      token,
      user: {
        id,
        email,
        name
      },
    };
  }


  async validateUserByToken(token: string) {
    try {
      const decodedToken = await this.jwtService.verify(token, { secret: jwtConstants().secret })
      const { id, email, name } = await this.prisma.user.findUnique({
        where: {
          id: decodedToken.sub,
        },
      });
      if (!id) {
        throw new UnauthorizedException('User not exists');
      }
      return {
        user: {
          id,
          name,
          email,
        }
      };
    } catch (error) {
      throw new BadRequestException('Erro on validate User - wrong Token')
    }
  }
}
