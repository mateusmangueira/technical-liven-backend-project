import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

import { Address } from './interface/address.interface';

import constants from './constants/constants';

@Injectable()
export class AddressesService {
  constructor(
    @Inject(constants().addressProvide)
    private addressModel: Model<Address>,
  ) { }

  async createAddress(createAddressDto: CreateAddressDto) {
    return 'This action adds a new address';
  }

  async findAll() {
    return `This action returns all addresses`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  async remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
