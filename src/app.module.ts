import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { ProductsController } from './products/products.controller';
import { InventoryController } from './inventory/inventory.controller';
import { ProductsService } from './products/products.service';
import { InventoryService } from './inventory/inventory.service';
import { Product } from './products/product.entity';
import { Inventory } from './inventory/inventory.entity';
import { Transfer } from './inventory/transfer.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
      envFilePath: ['.env'], // Load the .env file
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product, Inventory, Transfer],
      synchronize: true,
      
    }),
    TypeOrmModule.forFeature([Product, Inventory, Transfer]),
    ProductsModule,
    InventoryModule,
  ],
  controllers: [AppController, ProductsController, InventoryController],
  providers: [AppService, ProductsService, InventoryService],
})
export class AppModule {}
