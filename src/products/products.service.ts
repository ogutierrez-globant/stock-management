import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO, ProductQuery } from 'src/types/product.interface';
import { CreateProductDTO } from 'src/dtos/createProductDTO';
import { Product } from './product.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  getProducts(searchParams: ProductQuery): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product')
    // console.log(searchParams)
    if (searchParams.category) {
      queryBuilder.andWhere('product.category = :category', { category: searchParams.category })
    }

    if (searchParams.price_gt) {
      queryBuilder.andWhere('product.price >= :priceGreaterThan', { priceGreaterThan: searchParams.price_gt })
    }

    if (searchParams.price_lt) {
      queryBuilder.andWhere('product.price <= :priceLessThan', { priceLessThan: searchParams.price_lt })
    }

    const page = searchParams.page || 1; 
    const limit = searchParams.limit || 10

    const skip = (page - 1) * limit;

    console.log("skip", skip)

    // Apply pagination to the query
    queryBuilder.skip(skip).take(limit);

    return queryBuilder.getMany()
  }

  getProduct(id: string): Promise<Product[]> {
    return this.productRepository.findBy({ id: id });
  }

  async createProducts(products: CreateProductDTO[]): Promise<any> {
    return this.dataSource.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(Product, products)
    })
  }

  updateProduct(id: string, updateData: Partial<Product>) {
    console.log(id, updateData)
    return this.productRepository.update(id, updateData )
  }

  deleteProduct(id: string) {
    return this.productRepository.delete(id)
  }
}
