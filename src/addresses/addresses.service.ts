import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

import { PrismaService } from '../database/prisma.service';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async createAddress(createAddressDto: CreateAddressDto) {
    try {
      const address = await this.prisma.address.findUnique({
        where: {
          postCode: createAddressDto.postCode
        }
      })

      if (address) {
        throw new BadRequestException("Address already exists, try another post code")
      }
      const { id, street, street_number, neighborhood, city, state, country, postCode, userId } = await this.prisma.address.create({
        data: createAddressDto

      })

      return new AddressEntity({
        id,
        street,
        street_number,
        neighborhood,
        city,
        state,
        country,
        postCode,
        userId,
      });

    } catch (error) {
      throw new BadRequestException(error);
    }

  }

  async findAllFilters(addressesFilters: CreateAddressDto) {
    const { street, street_number, neighborhood, city, country, postCode, state } = addressesFilters;
    return await this.prisma.address.findMany({
      where: {
        street,
        street_number,
        neighborhood,
        city,
        country,
        postCode,
        state
      },
      include: {
        user: true,
      }
    });
  }

  async findAll() {
    return await this.prisma.address.findMany({
      include: {
        user: true,
      }
    });
  }

  async findOne(id: number) {
    const address = await this.prisma.address.findUnique({
      where: {
        id
      }
    })

    if (!address) {
      throw new BadRequestException('Address not found - error on find one')
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      return await this.prisma.address.update({
        where: {
          id
        },
        data: updateAddressDto
      })
    } catch (error) {
      throw new BadRequestException('Address was not found, invalid update address');
    }
  }

  async remove(id: number) {
    const address = await this.prisma.address.findUnique({
      where: {
        id
      }
    })

    if (!address) {
      throw new BadRequestException("Address not found - error on Delete")
    }
    return await this.prisma.address.delete({
      where: {
        id
      }
    })
  }

  async removeAll() {
    try {
      return await this.prisma.address.deleteMany();
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
