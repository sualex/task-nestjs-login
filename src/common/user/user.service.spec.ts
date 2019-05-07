import {UserService} from './user.service';
import {Test, TestingModule} from '@nestjs/testing';
import {UserTokenService} from './token/user-token.service';
import {UserToken} from './token/user-token';
import {UserNotFoundException} from './user.errors';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                UserTokenService,
            ],
        }).compile();
        service = module.get<UserService>(UserService);
    });

    it('must be defined', () => {
        expect(service).toBeDefined();
    });

    it('authenticate() must throw UserNotFoundException given incorrect credentials', async () =>  {
        expect.assertions(1);
        const credentials = {
            email: 'dmin@admin.ru',
            password: '12345678',
        };
        await expect(service.authenticate(credentials)).rejects
            .toThrow(UserNotFoundException);
    });

    it('(await authenticate()) must return a UserToken instance given correct credentials', async () => {
        expect.assertions(1);
        const credentials = {
            email: 'admin@admin.ru',
            password: '12345678',
        };
        const token = await service.authenticate(credentials);
        expect(token).toBeInstanceOf(UserToken);
    });

});
