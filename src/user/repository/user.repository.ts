import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.document';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async save(user: User): Promise<User> {
    const userFound = await this.findUserByEmail(user.email);
  
    if (userFound && userFound.email === user.email) {
      throw new NotFoundException('Email já cadastrado.');
    }
  
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
  
  async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = await this.userModel.findOne({ email }).exec();
    return foundUser;
  }

  async findUserById(userUuid: string): Promise<User> {
    this.logger.log('UserUuid REPOSITORY uuId------------------>', userUuid)
    const foundUser = await this.userModel.findOne({ userUuid: userUuid }).exec();
    this.logger.log('foundUser REPOSITORY uuId------------------>', foundUser)
    return foundUser;
  }
};