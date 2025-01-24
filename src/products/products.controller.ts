import { Controller, Get, Post, Put, Delete, Param, Body, Query, Logger, ParseArrayPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO, ProductQuery } from 'src/types/product.interface';
import { CreateProductDTO } from 'src/dtos/createProductDTO';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query() searchParams: ProductQuery): Promise<Product[]> {
    Logger.log("GET Products called")
    return this.productsService.getProducts(searchParams);
  }

  @Get(':id')
  getProduct(@Param() params: any): Promise<Product[]> {
    Logger.log("GET Product called")
    return this.productsService.getProduct(params.id)
  }

  @Post() 
  createProducts(@Body(new ParseArrayPipe({ items: CreateProductDTO }))
  CreateProductDtos: CreateProductDTO[],
  ) {
    return this.productsService.createProducts(CreateProductDtos)
  }

  @Put(':id')
  updateProduct(
    @Param() params: any,
    @Body() product: Partial<CreateProductDTO>
    ) {
    return this.productsService.updateProduct(params.id, product)
  } 

  @Delete(':id')
  deleteProduct(@Param() params: any) {
    return this.productsService.deleteProduct(params.id)
  }
}

