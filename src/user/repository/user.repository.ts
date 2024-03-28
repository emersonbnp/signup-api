import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.document';
import { IUserRepository } from './user.repository.interface';
import { Types } from 'mongoose';

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

  async update(user: User): Promise<User> {
    const userFound = await this.findUserByEmail(user.email);
    
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
  
      userFound.person.name = user.person.name
      userFound.person.birthDate = user.person.birthDate
      userFound.password = user.password
      userFound.person.address.city = user.person.address.city
      userFound.person.address.state = user.person.address.state
      userFound.person.address.street = user.person.address.street
      userFound.person.address.zipCode = user.person.address.zipCode
      
      try {
        const updatedUser = await this.userModel.findByIdAndUpdate(userFound._id, userFound, { new: true });
        return updatedUser;
      } catch (error) {
        console.log(error)
        throw new InternalServerErrorException('Failed to update user');
      }

  }

};