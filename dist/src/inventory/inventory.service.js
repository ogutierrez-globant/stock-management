"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inventory_entity_1 = require("./inventory.entity");
const typeorm_2 = require("typeorm");
const transfer_entity_1 = require("./transfer.entity");
let InventoryService = class InventoryService {
    constructor(inventoryRepository, dataSource) {
        this.inventoryRepository = inventoryRepository;
        this.dataSource = dataSource;
    }
    createInventory(inventory) {
        return this.inventoryRepository.save(inventory);
    }
    getInventoryByStore(id) {
        return this.inventoryRepository.find({ where: { storeId: id } });
    }
    async transferInventory(transfer) {
        const sourceProductStock = await this.inventoryRepository.findOne({ where: { productId: transfer.productId, storeId: transfer.sourceStoreId } });
        if (sourceProductStock.quantity < transfer.quantity) {
            throw new Error('Quantity to transfer exceeds current stock');
        }
        let reduceInventory = {
            quantity: (sourceProductStock.quantity - transfer.quantity),
        };
        const targetProductStore = await this.inventoryRepository.findOne({ where: { productId: transfer.productId, storeId: transfer.targetStoreId } });
        let augmentInventory;
        if (targetProductStore) {
            augmentInventory = {
                quantity: (targetProductStore.quantity + transfer.quantity),
            };
        }
        else {
            augmentInventory = {
                productId: transfer.productId,
                storeId: transfer.targetStoreId,
                quantity: transfer.quantity,
                minStock: sourceProductStock.minStock
            };
        }
        return this.dataSource.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.update(inventory_entity_1.Inventory, sourceProductStock.id, reduceInventory);
            if (targetProductStore) {
                await transactionalEntityManager.update(inventory_entity_1.Inventory, targetProductStore.id, augmentInventory);
            }
            else {
                await transactionalEntityManager.save(inventory_entity_1.Inventory, augmentInventory);
            }
            await transactionalEntityManager.save(transfer_entity_1.Transfer, transfer);
            return true;
        });
    }
    showLowStockProducts() {
        return this.inventoryRepository.createQueryBuilder('inventory')
            .where('inventory.quantity < inventory.minStock')
            .getMany();
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map