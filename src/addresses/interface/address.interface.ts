import { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';

export interface Address extends Document {
  readonly street: string;
  readonly number: number;
  readonly neighborhood: string;
  readonly city: string;
  readonly state: string;
  readonly postCode: string;
  readonly user: User;
}
