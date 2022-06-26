import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }

  @Post()
  async createAddress(@Body() createAddressDto: CreateAddressDto) {
    return await this.addressesService.createAddress(createAddressDto);
  }

  @Get()
  async findAll() {
    return await this.addressesService.findAll();
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string) {
    return await this.addressesService.findOne(_id);
  }

  @Patch(':_id')
  async update(@Param('_id') _id: string, @Body() updateAddressDto: UpdateAddressDto) {
    // return await this.addressesService.update(_id, updateAddressDto);
  }

  @Delete(':_id')
  async remove(@Param('_id') _id: string) {
    return await this.addressesService.remove(_id);
  }
}
