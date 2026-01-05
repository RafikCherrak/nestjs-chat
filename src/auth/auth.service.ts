import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService,) {}

  async login({ authBody }: { authBody: AuthBody }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const { email, parssword } = authBody;
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas.");
    }
    const isPasswordValid = await this.isPasswordValid({
      parssword,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      hashedPassword: existingUser.password,
    });
    if (!isPasswordValid) {
      throw new Error('Mot de passe invalide.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.authenticateUser({ userId: existingUser.id });
  }
  private async hashPassword({ password }: { password: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return hashedPassword;
  }
  private async isPasswordValid({
    parssword,
    hashedPassword,
  }: {
    parssword: string;
    hashedPassword: string;
  }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    const isPasswordValid = await bcrypt.compare(parssword, hashedPassword);
    return isPasswordValid;
  }
  private authenticateUser({ userId }: UserPayload) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload: UserPayload = { userId };
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      access_token: this.jwtService.sign(payload),
    };
  }
}
