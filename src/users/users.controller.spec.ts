import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Create User', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("User Controller should be defined", () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a new User', async () => {
    const userData: CreateUserDto = {
      name: 'Mateus Test',
      email: 'mateus-teste@gmail.com',
      password: '1233215601',
    }
    const user = await controller.createUser(userData);
    expect(user).toHaveProperty("id");
  });
});
