import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()
export class ProductService {
    private products:Product[] = [];

    // no need to add type string to function because typescript has feature "Type Inference" which define auto type
    insertProduct(title: string, desc: string, price: number) {
        const id = new Date().toString();
        const newProd = new Product(id, title, desc, price);

        this.products.push(newProd);
        return id;
    }

    getProducts() {
        return [...this.products] //destructure because I don't want to reference the products private variable.
    }
    
}