import { TransactionType } from '../types/transaction-type.enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  productId: string;

  @Column()
  sourceStoreId: string;

  @Column()
  targetStoreId: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;
}
