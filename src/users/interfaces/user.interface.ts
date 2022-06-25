import { Document } from 'mongoose';
import { Address } from 'src/schemas/addresses/address.schema';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly address: Address[];
}
