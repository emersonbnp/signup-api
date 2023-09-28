import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.document';
import { IUserRepository } from './user.repository.interface';
export declare class UserRepository implements IUserRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    save(user: User): Promise<User>;
    findUser(email: User["email"], password: User['password']): Promise<User>;
}
