import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

export type AuthBody = { email: string; parssword: string };
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() authBody: AuthBody) {
    console.log('authBody', authBody);
    return await this.authService.login({ authBody });
  }
}
