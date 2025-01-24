import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { DataSource, Repository } from 'typeorm';
import { Transfer } from './transfer.entity';

describe('InventoryService', () => {
  let service: InventoryService;
  let inventoryRepository: Repository<Inventory>;
  let transferRepository: Repository<Transfer>
  let dataSource: DataSource;

  const mockInventoryRepository = {
    find: jest.fn(),
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
      providers: [InventoryService, 
        {
          provide: getRepositoryToken(Inventory),
          useValue: mockInventoryRepository,
        }, 
        {
          provide: DataSource,
          useValue: mockDataSource,
        }
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    inventoryRepository = module.get<Repository<Inventory>>(getRepositoryToken(Inventory));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getInventoryByStore', () => {
    it('should return stock from one product', async () => {
      let mockInventory = [
        {
          "id": 3,
          "productId": "2",
          "storeId": "2",
          "quantity": 30,
          "minStock": 35
        }
      ]
      mockInventoryRepository.find.mockResolvedValue(mockInventory);
      const result = await service.getInventoryByStore("2")
      expect(result).toEqual(mockInventory)
    })
  })
});
