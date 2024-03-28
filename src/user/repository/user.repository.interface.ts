import { User } from '../schema/user.document';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  findUserById(userUuid: string): Promise<User>;
  update(user: User): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');