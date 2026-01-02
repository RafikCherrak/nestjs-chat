import { AuthService } from './auth.service';
export type AuthBody = {
    email: string;
    parssword: string;
};
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(authBody: AuthBody): Promise<string>;
}
