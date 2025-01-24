import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('stores/:id') 
  getInventoryByStore(@Param() params: any) {
    return this.inventoryService.getInventoryByStore(params.id)
  }

  @Post('transfer')
  transferInventory(@Body() body : any) {
    return this.inventoryService.transferInventory(body)
  }

  @Get('alerts')
  showLowStockProducts() {
    return this.inventoryService.showLowStockProducts()
  }

  @Post()
  createInventory(@Body() inventory: Inventory) {
    return this.inventoryService.createInventory(inventory)
  }
}
