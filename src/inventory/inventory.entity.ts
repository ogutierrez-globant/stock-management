import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  productId: string;

  @Column()
  storeId: string;

  @Column()
  quantity: number;

  @Column()
  minStock: number;
}