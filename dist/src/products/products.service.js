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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
const typeorm_2 = require("typeorm");
let ProductsService = class ProductsService {
    constructor(productRepository, dataSource) {
        this.productRepository = productRepository;
        this.dataSource = dataSource;
    }
    getProducts(searchParams) {
        const queryBuilder = this.productRepository.createQueryBuilder('product');
        if (searchParams.category) {
            queryBuilder.andWhere('product.category = :category', { category: searchParams.category });
        }
        if (searchParams.price_gt) {
            queryBuilder.andWhere('product.price >= :priceGreaterThan', { priceGreaterThan: searchParams.price_gt });
        }
        if (searchParams.price_lt) {
            queryBuilder.andWhere('product.price <= :priceLessThan', { priceLessThan: searchParams.price_lt });
        }
        const page = searchParams.page || 1;
        const limit = searchParams.limit || 10;
        const skip = (page - 1) * limit;
        console.log("skip", skip);
        queryBuilder.skip(skip).take(limit);
        return queryBuilder.getMany();
    }
    getProduct(id) {
        return this.productRepository.findBy({ id: id });
    }
    async createProducts(products) {
        return this.dataSource.manager.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(product_entity_1.Product, products);
        });
    }
    updateProduct(id, updateData) {
        console.log(id, updateData);
        return this.productRepository.update(id, updateData);
    }
    deleteProduct(id) {
        return this.productRepository.delete(id);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ProductsService);
//# sourceMappingURL=products.service.js.map