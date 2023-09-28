import { User } from '../schema/user.document';
export interface IUserService {
    save(user: User): Promise<User>;
    findUser(email: User['email'], password: User['password']): Promise<User>;
}
export declare const IUserService: unique symbol;
