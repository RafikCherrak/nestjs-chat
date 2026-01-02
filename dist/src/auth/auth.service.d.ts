import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    login({ authBody }: {
        authBody: AuthBody;
    }): Promise<string>;
    private hashPassword;
    private isPasswordValid;
}
