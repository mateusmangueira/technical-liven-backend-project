import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { UsersService } from './users.service';

describe('UserService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, JwtService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('User Service should be defined', () => {
    expect(service).toBeDefined();
  });
});
