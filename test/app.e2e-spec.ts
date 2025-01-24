import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';
import { AppController } from '../src/app.controller'
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  let appService = { getHealth: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET health`, () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
  });

  afterAll(async () => {
    await app.close();
  });
});