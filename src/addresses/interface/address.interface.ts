import { Document } from 'mongoose';
import { User } from 'src/schemas/users/user.schema';

export interface Address extends Document {
  readonly street: string;
  readonly number: number;
  readonly neighborhood: string;
  readonly city: string;
  readonly state: string;
  readonly postCode: string;
  readonly user: User;
}
