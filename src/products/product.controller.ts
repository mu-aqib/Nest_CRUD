import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ) {
       const id = this.productService.insertProduct(title, description, price);
       return { id }
    }

    @Get()
    getProducts() {
        return this.productService.getProducts();
    }

    // get single product
    @Get(':id')
    getSingleProduct(@Param('id') productId: string) {
        return this.productService.getSingleProduct(productId);
    }
}