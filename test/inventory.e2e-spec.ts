import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { InventoryModule } from '../src/inventory/inventory.module';
import { InventoryService } from '../src/inventory/inventory.service';
import { INestApplication } from '@nestjs/common';
import { Inventory } from '../src/inventory/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from '../src/inventory/inventory.controller';
import { DataSource } from 'typeorm';

describe('Products e2e', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:', // Use in-memory database for testing
        entities: [Inventory], // Add your entities here
        synchronize: true, // Automatically create the database schema
      }),
      TypeOrmModule.forFeature([Inventory]),
      InventoryModule],
      controllers: [InventoryController],
      providers: [InventoryService]
    }).compile();

    dataSource = moduleRef.get<DataSource>(DataSource);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET stores/:id`, () => {
    return request(app.getHttpServer()).get('/inventory/stores/:id').expect(200)
  });

  it(`/GET alerts`, () => {
    return request(app.getHttpServer()).get('/inventory/alerts').expect(200)
  });

  afterAll(async () => {
    await app.close();
  });
});
