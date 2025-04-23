import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/User/user.schema.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServise: AuthService) {}

  @Post('signin')
  signIn(@Body() user: UserDTO) {
    const { email, password } = user;
    const res = this.authServise.signIn(email, password);
    return res;
  }
}
