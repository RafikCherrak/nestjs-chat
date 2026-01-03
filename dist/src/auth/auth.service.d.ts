import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login({ authBody }: {
        authBody: AuthBody;
    }): Promise<{
        access_token: string;
    }>;
    private hashPassword;
    private isPasswordValid;
    private authenticateUser;
}
