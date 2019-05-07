import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from '../../../common/user/user.service';
import {UserController} from './user.controller';
import {UserTokenService} from '../../../common/user/token/user-token.service';
import {UnauthorizedException} from '@nestjs/common';
import {UserToken} from '../../../common/user/token/user-token';

describe('UserController', () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                UserTokenService,
            ],
        }).compile();
        controller = module.get<UserController>(UserController);
    });

    it('must be defined', () => {
        expect(controller).toBeDefined();
    });

    it('login() must throw UnauthorizedException given incorrect credentials', async () =>  {
        expect.assertions(1);
        const user = {
            email: 'dmin@admin.ru',
            password: '12345678',
        };
        await expect(controller.login(user)).rejects
            .toThrow(UnauthorizedException);
    });

    it('(await login()) must return a UserToken instance given correct credentials', async () => {
        expect.assertions(1);
        const credentials = {
            email: 'admin@admin.ru',
            password: '12345678',
        };
        const token = await controller.login(credentials);
        expect(token).toBeInstanceOf(UserToken);
    });

});
