import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.model";
import { Model } from "mongoose";
@Injectable()
export class ProductService {
    private products:Product[] = [];

    constructor(
        @InjectModel('Product') private productModel: Model<Product>
    ) {}

    // ---------------------------- shared methods
    private async findProduct(id: string) : Promise <Product> 
    {
        // const index = this.products.findIndex( p => p.id === id );
        // const singleProduct = this.products[index]
        // if (!singleProduct) {
        //     throw new NotFoundException('Could not find product.');
        // }

        // return [singleProduct, index];
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find product.');
        }
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }

    //-------------------  CRUD OPERATION     ------------------------// 
    
    async insertProduct(title: string, desc: string, price: number) {   // no need to add type string to function because typescript has feature "Type Inference" which define auto type
        const id = Math.random().toString();
        // const newProd = new Product(id, title, desc, price);
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        });
        const result = await newProduct.save();
        return result.id;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();

        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
        })); 
    }

    async getSingleProduct(id: string) {
        const product = await this.findProduct(id);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }

    async updateProduct(id: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(id);
        if (title) {
             updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        await updatedProduct.save();
        return true;
    }

    async deleteProduct(id: string) {
        // const index = await ;
        // this.products.splice(index, 1);
        const result = await this.productModel.deleteOne({_id: id}).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find product.');
        }
        return true;
    }
    
}