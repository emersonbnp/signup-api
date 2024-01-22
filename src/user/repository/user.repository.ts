import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.document';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async save(user: User): Promise<User> {
    const userFound = await this.findUserByEmail(user.email);

    if (userFound && userFound.email === user.email) {
      throw new BadRequestException('Email já cadastrado.');
    }

    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = await this.userModel.findOne({ email }).exec();
    return foundUser;
  }

  async findUserById(userUuid: string): Promise<User> {
    const foundUser = await this.userModel.findOne({ userUuid: userUuid }).exec();
    return foundUser;
  }
};