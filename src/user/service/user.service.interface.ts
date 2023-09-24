import { User } from '../schema/user.document';

export interface IUserService {
  save(user: User): Promise<User>;
}

export const IUserService = Symbol('IUserService');
