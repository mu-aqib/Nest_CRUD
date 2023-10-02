import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()
export class ProductService {
    private products:Product[] = [];

    // ---------------------------- shared methods
    private findProduct(id: string) : [Product, number] 
    {
        const index = this.products.findIndex( p => p.id === id );
        const singleProduct = this.products[index]
        if (!singleProduct) {
            throw new NotFoundException('Could not find product.');
        }

        return [singleProduct, index];
    }

    //-------------------  CRUD OPERATION     ------------------------// 
    
    insertProduct(title: string, desc: string, price: number) {   // no need to add type string to function because typescript has feature "Type Inference" which define auto type
        const id = Math.random().toString();
        const newProd = new Product(id, title, desc, price);

        this.products.push(newProd);
        return id;
    }

    getProducts() {
        return [...this.products] //destructure because I don't want to reference the products private variable.
    }

    getSingleProduct(id: string) {
        const singleProduct = this.findProduct(id)[0]
        return { ...singleProduct }
    }

    updateProduct(id: string, title: string, desc: string, price: number) {
        const [singleProduct, index] = this.findProduct(id);
        const updatedProduct = {...singleProduct};

        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
        return true;
    }
    
}