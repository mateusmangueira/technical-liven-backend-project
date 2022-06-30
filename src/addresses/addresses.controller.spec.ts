import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

describe('Address Test Case', () => {
  let controller: AddressesController;
  let service: AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [AddressesService, PrismaService],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
    service = module.get<AddressesService>(AddressesService);
  });

  it("Address Controller and Address Service should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
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

  //Error aqui na mensagem do throw Error
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
    await controller.createAddress(addressData);
    expect(await controller.createAddress(addressData)).toEqual(new Error("Address already exists, try another post code"));
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
    expect(foundAddress).toEqual(address);
  });

  it('should be able to update a specific Address by ID', async () => {
  });

  it('should be able to delete a specific Address by ID', async () => {

  });
});
