import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ autoIndex: true })
export class Address {
  @Prop({ required: true })
  street: string
  @Prop({ required: true })
  city: string
  @Prop({ required: true })
  state: string
  @Prop({ required: true })
  zipCode: string
}