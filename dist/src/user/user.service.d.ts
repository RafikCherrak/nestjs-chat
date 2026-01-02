import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUsers(): Promise<{
        email: string;
        id: string;
        avatarFileKey: string | null;
        firstName: string | null;
    }[]>;
    getUser({ userId }: {
        userId: string;
    }): Promise<{
        email: string;
        id: string;
        avatarFileKey: string | null;
        stripeAccountId: string | null;
        firstName: string | null;
    } | null>;
}
