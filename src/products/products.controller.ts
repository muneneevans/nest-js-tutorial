import { ProductsService } from './products.service';
import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';

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
    getProduct(@Param("id") prodId: string) {
        return this.productsService.getSingleProduct(parseInt(prodId))
    }

    @Patch(":id")
    updateProduct(
        @Param("id") prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,) {

        return this.productsService.updateProduct(parseInt(prodId), prodTitle, prodDescription, prodPrice)
    }

    @Delete(":id")
    deleteProduct(@Param("id") prodId: string) {
        this.productsService.deleteProduct(parseInt(prodId))
    }


}
