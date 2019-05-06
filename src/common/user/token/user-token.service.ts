import { Injectable } from '@nestjs/common';
import { User } from '../user';
import { UserToken } from './user-token';
import * as rString from 'randomstring';

@Injectable()
export class UserTokenService {
    async getToken(user?: User) {
        // use user struct param for something more complicated than randomString :)
        // 32 chars string by default
        return new UserToken(rString.generate());
    }
}
