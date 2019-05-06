import { Injectable, UnauthorizedException } from '@nestjs/common';
import {User} from './user';
import {UserTokenService} from './token/user-token.service';
import {UserNotFoundException} from './user.errors';

@Injectable()
export class UserService {

  private users = [
    new User('admin@admin.ru', '12345678'),
    new User('user@user.ru', '87654321'),
  ];

  constructor(
      private readonly userTokenService: UserTokenService,
  ) {
  }

  async authenticate(credentials: {email: string, password: string}): Promise<any> {
    const user: User = this.users.find(
        ({email, password}) =>
            credentials.email === email && credentials.password === password,
    );
    if (!user) {
      throw new UserNotFoundException(`User ${credentials.email} not found!`);
    }
    return await this.userTokenService.getToken(user);
  }

}
