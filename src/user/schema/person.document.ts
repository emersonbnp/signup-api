import { Prop, Schema } from '@nestjs/mongoose';
import { Address } from '../schema/address.document'

@Schema({ autoIndex: true })
export class Person {
  @Prop({ required: true })
   name: string;
  @Prop({ required: true })
   birthDate: string
  @Prop({ required: true })
   address: Address
}