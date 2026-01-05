import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        avatarFileKey: string | null;
    }[]>;
    getUser(userId: string): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        avatarFileKey: string | null;
        stripeAccountId: string | null;
    } | null>;
}
