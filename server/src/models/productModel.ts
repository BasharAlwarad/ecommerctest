import { Schema, model, Types } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    // reference to category
    category: {
      type: Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model('Product', productSchema);
