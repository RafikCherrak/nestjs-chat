import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<{
        email: string;
        id: string;
        avatarFileKey: string | null;
        firstName: string | null;
    }[]>;
    getUser(userId: string): Promise<{
        email: string;
        id: string;
        avatarFileKey: string | null;
        stripeAccountId: string | null;
        firstName: string | null;
    } | null>;
}
