import { ProductsService } from './products.service';
import { Controller, ParseIntPipe, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,
    ) {
        const generateId = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice)
        return { id: generateId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts()
    }

    @Get(":id")
    getProduct(@Param("id", ParseIntPipe) prodId: number) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(":id")
    updateProduct(
        @Param("id", ParseIntPipe) prodId: number,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,) {

        return this.productsService.updateProduct((prodId), prodTitle, prodDescription, prodPrice)
    }

    @Delete(":id")
    deleteProduct(@Param("id", ParseIntPipe) prodId: number) {
        this.productsService.deleteProduct((prodId))
    }


}
