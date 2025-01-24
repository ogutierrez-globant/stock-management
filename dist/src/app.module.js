"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./products/products.module");
const inventory_module_1 = require("./inventory/inventory.module");
const products_controller_1 = require("./products/products.controller");
const inventory_controller_1 = require("./inventory/inventory.controller");
const products_service_1 = require("./products/products.service");
const inventory_service_1 = require("./inventory/inventory.service");
const product_entity_1 = require("./products/product.entity");
const inventory_entity_1 = require("./inventory/inventory.entity");
const transfer_entity_1 = require("./inventory/transfer.entity");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env'],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [product_entity_1.Product, inventory_entity_1.Inventory, transfer_entity_1.Transfer],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, inventory_entity_1.Inventory, transfer_entity_1.Transfer]),
            products_module_1.ProductsModule,
            inventory_module_1.InventoryModule,
        ],
        controllers: [app_controller_1.AppController, products_controller_1.ProductsController, inventory_controller_1.InventoryController],
        providers: [app_service_1.AppService, products_service_1.ProductsService, inventory_service_1.InventoryService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map