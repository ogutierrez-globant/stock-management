import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { Transfer } from './transfer.entity';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Transfer])],
  providers: [InventoryService],
  controllers: [InventoryController]
})

export class InventoryModule {}
