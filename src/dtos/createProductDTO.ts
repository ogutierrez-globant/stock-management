import { IsString, IsInt, IsPositive } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  sku?: string;
}