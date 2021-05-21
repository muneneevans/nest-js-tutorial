import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const prodId = this.products.length + 1
        const newProduct = new Product(
            prodId,
            title,
            description,
            price,
        );

        this.products.push(newProduct);
        return prodId
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: number) {
        const product = this.findProduct(productId)[0]
        return { ...product }

    }

    updateProduct(productId: number, title: string, description: string, price: number): Product {
        const [product, index] = this.findProduct(productId)
        const updateProduct = { ...product }
        if (title) {
            updateProduct.title = title
        }
        if (description) {
            updateProduct.description = description
        }
        if (price) {
            updateProduct.price = price
        }
        this.products[index] = updateProduct
        return updateProduct
    }

    deleteProduct(productId: number) {
        const [product, index] = this.findProduct(productId)
        this.products.splice(index, 1)
    }

    private findProduct(id: number): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException("Could not find product.")
        } else {
            return [product, productIndex]
        }


    }
}
