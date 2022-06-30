import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

describe('Address Test Case', () => {
  let controller: AddressesController;
  let service: AddressesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [AddressesService, PrismaService],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
    service = module.get<AddressesService>(AddressesService);
    prisma = module.get<PrismaService>(PrismaService);

    controller.removeAll();
  })


  it("Address Controller, Address Service and Prisma Service should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should be able to create a new Address', async () => {
    const addressData: CreateAddressDto = {
      street: 'Rua Teste',
      street_number: '100',
      neighborhood: "Bairro Teste",
      city: 'Cidade Teste',
      state: 'Estado Teste',
      country: 'Pais Teste',
      postCode: "1111111",
    }
    const address = await controller.createAddress(addressData);
    expect(address).toHaveProperty("id");
  });

  it('should not be able to create an existing Address', async () => {
    const addressData: CreateAddressDto = {
      street: 'Rua Teste',
      street_number: '100',
      neighborhood: "Bairro Teste",
      city: 'Cidade Teste',
      state: 'Estado Teste',
      country: 'Pais Teste',
      postCode: "1111112",
    }
    try {
      await controller.createAddress(addressData);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Address already exists, try another post code');
    }
  });

  it('should be able to get a specific Address by ID', async () => {
    const addressData: CreateAddressDto = {
      street: 'Rua Teste',
      street_number: '100',
      neighborhood: "Bairro Teste",
      city: 'Cidade Teste',
      state: 'Estado Teste',
      country: 'Pais Teste',
      postCode: "1111111",
    }
    const address = await controller.createAddress(addressData);
    expect(address).toHaveProperty("id");
    const foundAddress = await controller.findOne(address.id);
    expect(foundAddress.id).toEqual(address.id);
  });

  it('should be able to update a specific Address by ID', async () => {
    const addressData: CreateAddressDto = {
      street: 'Rua Teste',
      street_number: '100',
      neighborhood: "Bairro Teste",
      city: 'Cidade Teste',
      state: 'Estado Teste',
      country: 'Pais Teste',
      postCode: "111111111",
    }
    const address = await controller.createAddress(addressData);
    expect(address).toHaveProperty("id");

    const addressUpdateData: UpdateAddressDto = {
      street: 'Rua Teste Update',
      street_number: '101',
      neighborhood: "Bairro Teste Update",
      city: 'Cidade Teste Update',
      state: 'Estado Teste Update',
      country: 'Pais Teste Update',
      postCode: "222222",
    }
    const { street, street_number, neighborhood, city, state, country, postCode } = await controller.update(address.id, addressUpdateData);
    expect({ street, street_number, neighborhood, city, state, country, postCode }).toEqual(addressUpdateData)
  });

  it('should be able to delete a specific Address by ID', async () => {
    const addressData: CreateAddressDto = {
      street: 'Rua Teste Delete',
      street_number: '100',
      neighborhood: "Bairro Teste Delete",
      city: 'Cidade Teste Delete',
      state: 'Estado Teste Delete',
      country: 'Pais Teste Delete',
      postCode: "1111111111",
    }
    const address = await controller.createAddress(addressData);
    expect(address).toHaveProperty("id");

    const { id, street, street_number, neighborhood, city, state, country, postCode, userId } = await controller.remove(address.id);
    expect({ id, street, street_number, neighborhood, city, state, country, postCode, userId }).toEqual(address)

  });

  it('should be able to delete all Addresses', async () => {
    const addressData1: CreateAddressDto = {
      street: 'Rua Teste 1',
      street_number: '101',
      neighborhood: "Bairro Teste 1",
      city: 'Cidade Teste 1',
      state: 'Estado Teste 1',
      country: 'Pais Teste 1',
      postCode: "111111111",
    }
    const addressData2: CreateAddressDto = {
      street: 'Rua Teste 2',
      street_number: '102',
      neighborhood: "Bairro Teste 2",
      city: 'Cidade Teste 2',
      state: 'Estado Teste 2',
      country: 'Pais Teste 2',
      postCode: "111111112",
    }

    const addressData3: CreateAddressDto = {
      street: 'Rua Teste 3',
      street_number: '103',
      neighborhood: "Bairro Teste 3",
      city: 'Cidade Teste 3',
      state: 'Estado Teste 3',
      country: 'Pais Teste 3',
      postCode: "111111113",
    }

    const address1 = await controller.createAddress(addressData1);
    const address2 = await controller.createAddress(addressData2);
    const address3 = await controller.createAddress(addressData3);
    expect(address1).toHaveProperty("id");
    expect(address2).toHaveProperty("id");
    expect(address3).toHaveProperty("id");

    expect((await controller.findAll()).length).toBe(3);
    expect((await controller.removeAll()).count).toBe(3);
    expect((await controller.findAll()).length).toBe(0);

  });

});
