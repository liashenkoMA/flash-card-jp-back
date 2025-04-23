import { UserServise } from './user.service';
import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { UserDTO } from './user.schema.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserServise) {}

  @Post('/signup')
  createUser(@Body() user: UserDTO) {
    return this.userService.createUser(user);
  }

  @Get('/me')
  getUser(@Headers('authorization') headers: any) {
    return this.userService.getUser(headers);
  }
}
