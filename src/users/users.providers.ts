import { Connection } from 'mongoose';
import { UserSchema } from '../schemas/users/user.schema';
import constants from './constants/constants';

export const usersProviders = [
  {
    provide: constants().userProvide,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [constants().mongoConnection],
  },
];