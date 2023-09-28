import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.document';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

    async save(user: User): Promise<User> {

      await this.findUserByEmail(user.email);
      
      const newUser = new this.userModel(user);
      return await newUser.save();
    }
   
  async findUserByEmail(email: string): Promise<User> {
    const foundUser = await this.userModel.findOne({ email }).exec(); 
   
    if(foundUser) {
      throw new NotFoundException('Email já cadastrado.');
    } else {
      return;
    }
  }
};
