import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ProductsModule } from '../src/products/products.module';
import { ProductsService } from '../src/products/products.service';
import { INestApplication } from '@nestjs/common';
import { Product } from '../src/products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from '../src/products/products.controller';
import { DataSource } from 'typeorm';

describe('Products e2e', () => {
  let app: INestApplication;
  let productsService = { getProduct: () => ['test'] };
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:', // Use in-memory database for testing
        entities: [Product], // Add your entities here
        synchronize: true, // Automatically create the database schema
      }),
      TypeOrmModule.forFeature([Product]),
      ProductsModule],
      controllers: [ProductsController],
      providers: [ProductsService]
    }).compile();

    dataSource = moduleRef.get<DataSource>(DataSource);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET products`, () => {
    return request(app.getHttpServer()).get('/products').expect(200)
  });

  it(`/GET products`, () => {
    return request(app.getHttpServer()).get('/products/1').expect(200)
  });

  it(`/POST products`, () => {
    let product: Partial<Product> = {
      name: "product_name",
      description: "product_desc",
      category: "product_cat",
      price: 50000,
      sku: "1234"
    }
    return request(app.getHttpServer()).post('/products').send([product]).expect(201)
  });

  afterAll(async () => {
    await app.close();
  });
});
