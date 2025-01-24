import { Inventory } from './inventory.entity';
import { DataSource, Repository } from 'typeorm';
import { Transfer } from './transfer.entity';
export declare class InventoryService {
    private inventoryRepository;
    private dataSource;
    constructor(inventoryRepository: Repository<Inventory>, dataSource: DataSource);
    createInventory(inventory: Inventory): Promise<Inventory>;
    getInventoryByStore(id: string): Promise<Inventory[]>;
    transferInventory(transfer: Partial<Transfer>): Promise<boolean>;
    showLowStockProducts(): Promise<Inventory[]>;
}
