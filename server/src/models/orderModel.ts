import { Schema, model, Types } from 'mongoose';

const orderSchema = new Schema(
  {
    // reference to the user who placed the order (optional duplicate of user.orders)
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    // list of product ids included in this order
    products: [
      {
        type: Types.ObjectId,
        ref: 'Product',
      },
    ],
    // optional metadata
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model('Order', orderSchema);
