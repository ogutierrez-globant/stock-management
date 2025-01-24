import { ProductsService } from './products.service';
import { ProductQuery } from 'src/types/product.interface';
import { CreateProductDTO } from 'src/dtos/createProductDTO';
import { Product } from './product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(searchParams: ProductQuery): Promise<Product[]>;
    getProduct(params: any): Promise<Product[]>;
    createProducts(CreateProductDtos: CreateProductDTO[]): Promise<any>;
    updateProduct(params: any, product: Partial<CreateProductDTO>): Promise<import("typeorm").UpdateResult>;
    deleteProduct(params: any): Promise<import("typeorm").DeleteResult>;
}
