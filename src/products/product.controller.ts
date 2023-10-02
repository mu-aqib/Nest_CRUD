import { Body, Controller, Get, Param, Patch, Post, Delete } from "@nestjs/common";
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

    // update product
    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        return this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    }

    // delete product
    @Delete(':id')
    deleteProduct(@Param('id') p_id: string) {
        this.productService.deleteProduct(p_id);
        return true;
    }
}