import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()
export class ProductService {
    products:Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const newProd = new Product(new Date().toString(), title, desc, price);

        this.products.push(newProd);
    }
    
}