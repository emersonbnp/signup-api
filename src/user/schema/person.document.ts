import { Prop, Schema } from '@nestjs/mongoose';
import { Address } from '../schema/address.document'

@Schema({ autoIndex: true })
export class Person {
  @Prop({ required: true })
  readonly name: string;
  @Prop({ required: true })
  readonly birthDate: string
  @Prop({ required: true })
  readonly address: Address
}