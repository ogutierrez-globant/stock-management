import { ProductQuery } from 'src/types/product.interface';
import { CreateProductDTO } from 'src/dtos/createProductDTO';
import { Product } from './product.entity';
import { Repository, DataSource } from 'typeorm';
export declare class ProductsService {
    private productRepository;
    private dataSource;
    constructor(productRepository: Repository<Product>, dataSource: DataSource);
    getProducts(searchParams: ProductQuery): Promise<Product[]>;
    getProduct(id: string): Promise<Product[]>;
    createProducts(products: CreateProductDTO[]): Promise<any>;
    updateProduct(id: string, updateData: Partial<Product>): Promise<import("typeorm").UpdateResult>;
    deleteProduct(id: string): Promise<import("typeorm").DeleteResult>;
}
