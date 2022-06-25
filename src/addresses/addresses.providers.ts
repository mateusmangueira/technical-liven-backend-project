import { Connection } from 'mongoose';
import { AddressSchema } from '../schemas/addresses/address.schema';
import constants from './constants/constants';

export const addressesProvider = [
  {
    provide: constants().addressProvide,
    useFactory: (connection: Connection) => connection.model('Address', AddressSchema),
    inject: [constants().mongoConnection],
  },
];