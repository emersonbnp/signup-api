import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from './location.document';
import { Person } from './person.document';

export type UserDocument = User & Document;

@Schema({ autoIndex: true })
export class User {
  public constructor({person, email, location, type }) {
    this.person = person;
    this.email = email;
    this.location = location;
    this.type = type;
  }
  @Prop({ unique: true })
  userUuid: string;
  @Prop({ required: true})
  readonly person: Person;
  @Prop({ required: true, unique: true })
  readonly email: string;
  @Prop({ required: true })
  readonly password: string;
  @Prop({ default: 'user' })
  readonly type: string;
  @Prop({ required: true, type: Location })
  readonly location: Location;
}

export const UserSchema = SchemaFactory.createForClass(User);
