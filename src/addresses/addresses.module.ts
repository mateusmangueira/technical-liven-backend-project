import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { addressesProvider } from './addresses.providers';
import { DatabaseModule } from 'src/database/mongodb.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressesController],
  providers: [
    AddressesService,
    ...addressesProvider]
})
export class AddressesModule { }
