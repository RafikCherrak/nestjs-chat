import { Injectable } from '@nestjs/common';
import { AuthBody, CreateUser } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService,) {}

  async login({ authBody }: { authBody: AuthBody }) {
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
      hashedPassword: existingUser.password,
    });
    if (!isPasswordValid) {
      throw new Error('Mot de passe invalide.');
    }
    return this.authenticateUser({ userId: existingUser.id });
  }

  async register({ registerBody }: { registerBody: CreateUser }) {
    const { email, parssword, firstName } = registerBody;
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("L'utilisateur existe déja.");
    }
    const hashedPassword = await this.hashPassword({ password: parssword });
    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
      },
    });
    return this.authenticateUser({ userId: createdUser.id });
  }

  private async hashPassword({ password }: { password: string }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
  private async isPasswordValid({
    parssword,
    hashedPassword,
  }: {
    parssword: string;
    hashedPassword: string;
  }) {
    const isPasswordValid = await bcrypt.compare(parssword, hashedPassword);
    return isPasswordValid;
  }
  private authenticateUser({ userId }: UserPayload) {
    const payload: UserPayload = { userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
