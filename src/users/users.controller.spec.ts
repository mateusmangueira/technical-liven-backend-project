import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAddressDto } from 'src/addresses/dto/update-address.dto';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('User Test Case', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("User Controller and User Service should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
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

  //Error aqui na mensagem do throw Error
  it('should not be able to create an existing User', async () => {
    const userData: CreateUserDto = {
      name: 'Mateus Test Existing',
      email: 'mateus-teste-existing@gmail.com',
      password: '1233215601',
    }
    await controller.createUser(userData);
    expect(await controller.createUser(userData)).toEqual(new Error('User already exists, try Login or another Email to register'))
  });

  it('should be able to get all Users', async () => {
    expect(await controller.findAll()).toEqual([]);

    const userData: CreateUserDto = {
      name: 'Mateus Test All User',
      email: 'mateus-teste-all-usersg@gmail.com',
      password: '1233215601',
    }
    await controller.createUser(userData);
    const user = await controller.findAll();
    expect(user).toEqual([
      {
        name: 'Mateus Test All User',
        email: 'mateus-teste-all-usersg@gmail.com',
        password: '1233215601',
      }
    ])
  });

  it('should be able to get a specific User by ID', async () => {
    const userData: CreateUserDto = {
      name: 'Mateus Test',
      email: 'mateus-teste-specific@gmail.com',
      password: '1233215601',
    }
    const user = await controller.createUser(userData);
    expect(user).toHaveProperty("id");
    const foundUser = await controller.findOne(user.id);
    expect(foundUser).toEqual(user);
  });

  it('should be able to update a specific User by ID', async () => {
  });

  it('should be able to delete a specific User by ID', async () => {
  });
});
