import {UserTokenService} from './user-token.service';
import {UserToken} from './user-token';
import {Test, TestingModule} from '@nestjs/testing';

describe('UserTokenService', () => {
    let service: UserTokenService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserTokenService],
        }).compile();
        service = module.get<UserTokenService>(UserTokenService);
    });

    it('must be defined', () => {
        expect(service).toBeDefined();
    });

    it('(await getToken()) must be an instance of UserToken', async () => {
        const token = await service.getToken();
        expect(token).toBeInstanceOf(UserToken);
    });

    it('(await getToken()).token must be a string', async () => {
        const { token } = await service.getToken();
        expect(typeof token).toBe('string');
    });

    it('(await getToken()).token.length must be 32', async () => {
        const { token: { length } } = await service.getToken();
        expect(length).toEqual(32);
    });

});
