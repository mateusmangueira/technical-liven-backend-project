import { Connection } from 'mongoose';
import { UserSchema } from '../users/entities/user.entity';
import constants from './constants/constants';

export const usersProviders = [
  {
    provide: constants().userProvide,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [constants().mongoConnection],
  },
];