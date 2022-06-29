import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

describe('AddressesController', () => {
  let controller: AddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [AddressesService, PrismaService],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it("Address Controller should be defined", () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a new Address', async () => {
    const addressData: CreateAddressDto = {
      street: 'Rua Teste',
      street_number: '100',
      neighborhood: "Bairro Teste",
      city: 'Cidade Teste',
      state: 'Estado Teste',
      country: 'Pais Teste',
      postCode: "111111",
    }
    const user = await controller.createAddress(addressData);
    expect(user).toHaveProperty("id");
  });
});
