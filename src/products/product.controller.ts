import { Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}
     
    @Get()
    getProducts(): string {
        return "hello product page!";
    }

    @Post()
    addProduct(): any {
        this.productService.insertProduct();
    } 
}