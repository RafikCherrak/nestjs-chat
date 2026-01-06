import { AuthService } from './auth.service';
import * as jwtStrategy from './jwt.strategy';
import { UserService } from 'src/user/user.service';
export type AuthBody = {
    email: string;
    parssword: string;
};
export type CreateUser = {
    email: string;
    parssword: string;
    firstName: string;
};
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(authBody: AuthBody): Promise<{
        access_token: string;
    }>;
    register(registerBody: CreateUser): Promise<{
        access_token: string;
    }>;
    authenticate(): Promise<{
        message: string;
    }>;
    authenticateUser(request: jwtStrategy.RequestWithUser): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        avatarFileKey: string | null;
        stripeAccountId: string | null;
    } | null>;
}
