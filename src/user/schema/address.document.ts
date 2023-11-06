import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ autoIndex: true })
export class Address {
  @Prop({ required: true })
  readonly street: string
  @Prop({ required: true })
  readonly city: string
  @Prop({ required: true })
  readonly state: string
  @Prop({ required: true })
  readonly zipCode: string
}