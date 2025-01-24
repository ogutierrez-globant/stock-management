import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getInventoryByStore(params: any): Promise<Inventory[]>;
    transferInventory(body: any): Promise<boolean>;
    showLowStockProducts(): Promise<Inventory[]>;
    createInventory(inventory: Inventory): Promise<Inventory>;
}
