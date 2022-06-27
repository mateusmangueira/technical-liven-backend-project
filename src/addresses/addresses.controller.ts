import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAddress(@Body() createAddressDto: CreateAddressDto) {
    return await this.addressesService.createAddress(createAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() addressesFilters: CreateAddressDto) {
    return await this.addressesService.findAll(addressesFilters);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':_id')
  async findOne(@Param('_id') _id: string) {
    return await this.addressesService.findOne(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':_id')
  async update(@Param('_id') _id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return await this.addressesService.update(_id, updateAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':_id')
  async remove(@Param('_id') _id: string) {
    return await this.addressesService.remove(_id);
  }
}
