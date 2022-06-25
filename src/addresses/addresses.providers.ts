import { Connection } from 'mongoose';
import { AddressSchema } from '../addresses/entities/address.entity';
import constants from './constants/constants';

export const addressesProvider = [
  {
    provide: constants().addressProvide,
    useFactory: (connection: Connection) => connection.model('Address', AddressSchema),
    inject: [constants().mongoConnection],
  },
];