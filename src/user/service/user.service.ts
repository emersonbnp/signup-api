import { HttpCode, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IUserRepository } from '../repository/user.repository.interface';
import { User } from '../schema/user.document';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async save(user: User): Promise<User> {
    user.userUuid = randomUUID();
    return await this.userRepository.save(user);
  };

  async update(user: User): Promise<User> {
    user.userUuid = randomUUID();
    return await this.userRepository.update(user);
  };

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findUserByEmail(email);
  };

  async findUserById(userUuid: string): Promise<User> {
    return await this.userRepository.findUserById(userUuid);
  };
};