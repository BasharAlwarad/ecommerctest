import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category?: Types.ObjectId;
  stock?: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = model<IProduct>('Product', productSchema);
export default Product;
