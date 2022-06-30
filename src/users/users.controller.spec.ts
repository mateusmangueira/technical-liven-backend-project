import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('User Test Case', () => {
  let controller: UsersController;
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    controller.removeAll();
  })

  it("User Controller, User Service and Prisma Service should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
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

  it('should not be able to create an existing User', async () => {
    const userData: CreateUserDto = {
      name: 'Mateus Test Existing',
      email: 'mateus-teste-existing@gmail.com',
      password: '1233215601',
    }
    try {
      await controller.createUser(userData);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('User already exists, try Login or another Email to register');
    }
  });

  it('should be able to get all Users', async () => {
    expect((await controller.findAll()).length).toBe(0);

    const userData: CreateUserDto = {
      name: 'Mateus Test All User',
      email: 'mateus-teste-all-usersg@gmail.com',
      password: '1233215601',
    }
    await controller.createUser(userData);
    const users = await controller.findAll();
    expect(users.length).toBe(1);
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
    expect(foundUser.id).toEqual(user.id);
  });

  it('should not be able to get a specific User by wrong ID', async () => {
    const userData: CreateUserDto = {
      name: 'Mateus Test',
      email: 'mateus-teste-specific@gmail.com',
      password: '1233215601',
    }
    const user = await controller.createUser(userData);
    expect(user).toHaveProperty("id");
    try {
      await controller.findOne((user.id + 1));
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('User was not found, wrong id');
    }
  });

  it('should be able to update a specific User by ID', async () => {
    const userData: CreateUserDto = {
      name: 'Mateus Test Update',
      email: 'mateus-test-update@gmail.com',
      password: '1233215601',
    }
    const user = await controller.createUser(userData);
    expect(user).toHaveProperty("id");

    const userUpdateData: UpdateUserDto = {
      name: 'Mateus Updated Name',
      email: 'mateus-updated-email@gmail.com',
    }

    const { name, email } = await controller.update(user.id, userUpdateData);
    expect({ name, email }).toEqual(userUpdateData)
  });

  it('should not be able to update a specific User by wrong ID', async () => {
    const userData: CreateUserDto = {
      name: 'Mateus Test Update',
      email: 'mateus-test-update@gmail.com',
      password: '1233215601',
    }
    const user = await controller.createUser(userData);
    expect(user).toHaveProperty("id");

    const userUpdateData: UpdateUserDto = {
      name: 'Mateus Updated Name',
      email: 'mateus-updated-email@gmail.com',
    }

    try {
      await controller.update(user.id + 1, userUpdateData);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('User was not found, invalid update user');
    }
  });

  it('should be able to delete a specific User by ID', async () => {
    const userData: CreateUserDto = {
      name: 'Mateus Test Delete',
      email: 'mateus-test-delete@gmail.com',
      password: '1233215601',
    }
    const user = await controller.createUser(userData);
    expect(user).toHaveProperty("id");

    const { id, name, email } = await controller.remove(user.id);
    expect({ id, name, email }).toEqual(user)
  });

  it('should not be able to delete a specific User by wrong ID', async () => {
    const userData: CreateUserDto = {
      name: 'Mateus Test Delete',
      email: 'mateus-test-delete@gmail.com',
      password: '1233215601',
    }
    const user = await controller.createUser(userData);
    expect(user).toHaveProperty("id");

    try {
      await controller.remove(user.id + 1);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('User was not found, invalid delete user');
    }
  });

  it('should be able to delete all Users', async () => {
    const userData1: CreateUserDto = {
      name: 'Mateus Test All Delete 1',
      email: 'mateus-teste-delete1@gmail.com',
      password: '1233215601',
    }
    const user1 = await controller.createUser(userData1);
    expect(user1).toHaveProperty("id");

    const userData2: CreateUserDto = {
      name: 'Mateus Test All Delete 2',
      email: 'mateus-teste-delete2@gmail.com',
      password: '1233215601',
    }
    const user2 = await controller.createUser(userData2);
    expect(user2).toHaveProperty("id");

    expect((await controller.findAll()).length).toBe(2);
    expect((await controller.removeAll()).count).toBe(2);
    expect((await controller.findAll()).length).toBe(0);
  });

});
