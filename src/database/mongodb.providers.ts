import * as mongoose from 'mongoose';
import constants from 'src/users/constants/constants';

export const mongodb = [
  {
    provide: constants().mongoConnection,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URL),
  },
];