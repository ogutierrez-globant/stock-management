import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { DataSource, LessThan, Repository } from 'typeorm';
import { Transfer } from './transfer.entity';

@Injectable()
export class InventoryService {

  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private dataSource: DataSource
  ) {}

  createInventory(inventory: Inventory) {
    return this.inventoryRepository.save(inventory);
  }

  getInventoryByStore(id: string) {
    return this.inventoryRepository.find({ where: { storeId: id } })
  }

  async transferInventory(transfer: Partial<Transfer>) {
    //validate sufficient stock
    const sourceProductStock = await this.inventoryRepository.findOne({ where: { productId: transfer.productId, storeId: transfer.sourceStoreId } })
    if (sourceProductStock.quantity < transfer.quantity) {
      throw new Error('Quantity to transfer exceeds current stock')
    }

    let reduceInventory: Partial<Inventory> = {
      quantity: (sourceProductStock.quantity - transfer.quantity),
    }
    
    
    const targetProductStore = await this.inventoryRepository.findOne({ where: { productId: transfer.productId, storeId: transfer.targetStoreId } })
    let augmentInventory: Partial<Inventory>
    if ( targetProductStore ) {
      augmentInventory = {
        quantity: (targetProductStore.quantity + transfer.quantity),
      }
    } else {
      augmentInventory = {
        productId: transfer.productId,
        storeId: transfer.targetStoreId,
        quantity: transfer.quantity,
        minStock: sourceProductStock.minStock
      }
    }

    //update rows, origin, target and register the transfer
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.update(Inventory, sourceProductStock.id, reduceInventory)
      if (targetProductStore) {
        await transactionalEntityManager.update(Inventory, targetProductStore.id, augmentInventory)
      } else {
        await transactionalEntityManager.save(Inventory, augmentInventory)
      }
      await transactionalEntityManager.save(Transfer, transfer)
      return true
    })
  }

  showLowStockProducts() {
    return this.inventoryRepository.createQueryBuilder('inventory')
        .where('inventory.quantity < inventory.minStock')
        .getMany();
  }

}
