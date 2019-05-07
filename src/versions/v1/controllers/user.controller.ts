import {Controller, Post, HttpCode, HttpStatus, Body, UnauthorizedException} from '@nestjs/common';
import {UserService} from '../../../common/user/user.service';
import {User} from '../../../common/user/user';

@Controller('v1/user')
export class UserController {

  constructor(
      private readonly userService: UserService,
  ) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: User) {
    try {
      return await this.userService.authenticate(credentials);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

}
