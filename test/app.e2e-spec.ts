import * as request from 'supertest';
import * as assert from 'assert';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {HttpStatus, INestApplication} from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it(`/v1/user/login (POST) correct credentials`, () => {
    return request(app.getHttpServer())
        .post('/v1/user/login')
        .send({email: 'admin@admin.ru', password: '12345678'})
        .expect(HttpStatus.OK)
        .then(response => {
          assert(typeof response.body.token === 'string');
        });
  });

  it(`/v1/user/login (POST) incorrect credentials`, () => {
    return request(app.getHttpServer())
        .post('/v1/user/login')
        .send({email: 'dmin@admin.ru', password: '12345678'})
        .expect(HttpStatus.UNAUTHORIZED)
        .then(response => {
          assert(JSON.stringify(response.body) === JSON.stringify(
              { statusCode: 401, error: 'Unauthorized' },
          ));
        });
  });

});
