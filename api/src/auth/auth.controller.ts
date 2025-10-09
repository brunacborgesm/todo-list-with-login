import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // base: /auth
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register') // POST /auth/register
  async register(@Body() dto: { email: string; password: string; name?: string }) {
    return this.auth.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login') // POST /auth/login
  async login(@Body() dto: { email: string; password: string }) {
    return this.auth.login(dto);
  }
}
