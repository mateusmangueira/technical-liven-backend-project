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
    const createdAddress = new this.addressModel(createAddressDto);
    return await createdAddress.save();
  }

  async findAll(): Promise<Address[]> {
    return await this.addressModel.find().exec();
  }

  async findOne(id: string) {
    return await this.addressModel.findById(id);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  async remove(id: string) {
    return await this.addressModel.findByIdAndDelete(id);
  }
}
