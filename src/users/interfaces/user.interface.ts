import { Document } from 'mongoose';
import { Address } from '../../addresses/entities/address.entity';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly address: Address[];
}
