import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
     
    @Get()
    getProducts(): string {
        return "hello product page!";
    }

    @Post()
    addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    ) {
       const id = this.productService.insertProduct(title, description, price);
       return { id }
    } 
}