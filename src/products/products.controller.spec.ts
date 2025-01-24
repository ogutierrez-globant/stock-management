import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDTO } from 'src/types/product.interface';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let repository: Repository<Product>;
  let dataSource: DataSource;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  const mockProductRepository = {
    findBy: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockTransactionalEntityManager = {
    save: jest.fn(),
  };

  const mockDataSource = {
    manager: {
      transaction: jest.fn((cb) => cb(mockTransactionalEntityManager)), // Call the callback with the mock manager
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService, 
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        }, 
        {
          provide: DataSource,
          useValue: mockDataSource,
        }
      ]
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const mockProducts: Product[] = [
        { id: '1', name: 'name', description: 'desc', category: 'electronics', price: 2, sku: '123' }
      ]

      mockQueryBuilder.getMany.mockResolvedValue(mockProducts);
      // jest.spyOn(service, 'getProducts').mockImplementation(() => mockProducts);
      const product = await controller.getProducts({ category: 'electronics' });

      expect(product).toEqual(mockProducts);
      
    })
  })

  describe('getProduct', () => {
    it('should return just one product', async () => {
      const mockProducts: Product[] = [
        { id: '1', name: 'name', description: 'desc', category: 'category', price: 2, sku: '123' }
      ]

      mockProductRepository.findBy.mockResolvedValue(mockProducts);
      // jest.spyOn(service, 'getProducts').mockImplementation(() => mockProducts);
      const product = await controller.getProduct('1');

      expect(product).toEqual(mockProducts);
    })
  })

  describe('createProducts', () => {
    it('should create a product', async () => {
      let products: CreateProductDTO[] = [{ name: 'name', description: 'desc', category: 'category', price: 2, sku: '123' }]

      await service.createProducts(products)

      expect(mockDataSource.manager.transaction).toHaveBeenCalledTimes(1);

    })
  })

  describe('updateProduct', () => {
    it('should update a product', async () => {
      let updateData : Partial<Product> = { price: 250000 }
      await service.updateProduct("1", updateData)

      expect(mockProductRepository.update).toHaveBeenCalledTimes(1)
    })
  })

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      await service.deleteProduct("1")
      expect(mockProductRepository.delete).toHaveBeenCalledTimes(1)
    })
  })
});
