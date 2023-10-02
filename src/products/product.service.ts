import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()
export class ProductService {
    products:Product[] = [];

    // no need to add type string to function because typescript has feature "Type Inference" which define auto type
    insertProduct(title: string, desc: string, price: number) {
        const id = new Date().toString();
        const newProd = new Product(id, title, desc, price);

        this.products.push(newProd);
        return this.products;
    }
    
}