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
  async findAllFilters(@Query() addressesFilters: CreateAddressDto) {
    return await this.addressesService.findAllFilters(addressesFilters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return await this.addressesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.addressesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return await this.addressesService.update(+id, updateAddressDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.addressesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeAll() {
    return await this.addressesService.removeAll();
  }
}
