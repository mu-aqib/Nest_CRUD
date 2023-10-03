import mongoose from 'mongoose';
export const productSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
})


// export class Product {
//     constructor(public id: String, public title: string, public description: string, public price:number ) {}
// }

export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
}