import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoSignIn, AuthDtoSignUp } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDtoSignUp) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body() dto: AuthDtoSignIn) {
    return this.authService.signIn(dto);
  }
}
