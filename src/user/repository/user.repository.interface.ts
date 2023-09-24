import { User } from '../schema/user.document';

export interface IUserRepository {
  save(user: User): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
