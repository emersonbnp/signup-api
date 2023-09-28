import { User } from '../schema/user.document';
import { IUserService } from '../service/user.service.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: IUserService);
    save(response: any, user: User): Promise<User>;
    login(response: any, user: User): Promise<User>;
}
