import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../users/user.schema';

export type AddressDocument = Address & Document;

@Schema()
export class Address {

  @Prop({ required: true })
  street: string;

  @Prop()
  number: number;

  @Prop({ required: true })
  neighborhood: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  postCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const AddressDocument = SchemaFactory.createForClass(Address);