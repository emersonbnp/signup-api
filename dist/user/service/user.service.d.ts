import { IUserRepository } from '../repository/user.repository.interface';
import { User } from '../schema/user.document';
import { IUserService } from './user.service.interface';
export declare class UserService implements IUserService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    save(user: User): Promise<User>;
    findUser(email: User['email'], password: User['password']): Promise<User>;
}
