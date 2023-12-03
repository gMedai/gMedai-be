import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ConfirmCodeDto, LoginDto, SignupDto, resendCodeDto } from './dto';
import { UserService } from '@modules/user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  public async signup(@Body() body: SignupDto) {
    await this.authService.signup(body);
    const user = this.userService.create({ username: body.username });

    return user;
  }

  @Post('/signup/confirm-code')
  @HttpCode(HttpStatus.OK)
  public confirmCode(@Body() body: ConfirmCodeDto) {
    return this.authService.confirmCode(body);
  }

  @Post('/signup/resend-code')
  @HttpCode(HttpStatus.OK)
  public resendCode(@Body() body: resendCodeDto) {
    return this.authService.resendCode(body);
  }
}
