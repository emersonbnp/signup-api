import { User } from '../schema/user.document';

export interface IUserService {
  save(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(userUuid: string): Promise<User>;
}

export const IUserService = Symbol('IUserService');