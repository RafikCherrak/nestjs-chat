import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import * as jwtStrategy from './jwt.strategy';
import { UserService } from 'src/user/user.service';

export type AuthBody = { email: string; parssword: string };
export type CreateUser = {
  email: string;
  parssword: string;
  firstName: string;
};
@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() authBody: AuthBody) {
    return await this.authService.login({ authBody });
  }

  @Post('register')
  async register(@Body() registerBody: CreateUser) {
    return await this.authService.register({ registerBody });
  }

  @Get()
  async authenticate() {
    await fetch('auth', {
      body: JSON.stringify({
        email: 'rafikcherrak07@gmail.com',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer abc123',
      },
    });
    return { message: 'Authentication service is running.' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  // eslint-disable-next-line @typescript-eslint/require-await
  async authenticateUser(@Request() request: jwtStrategy.RequestWithUser) {
    return await this.userService.getUser({ userId: request.user.userId });
  }
  // app.get('/auth', (req, res) => {
  //   req.body;
  //   req.userId
  //   req.json({data: "aezazezazezazezazezazezazezazezazezazezazezazezaze"})
  // });
}
