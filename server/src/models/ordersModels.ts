import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  products: IOrderProduct[];
  total: number;
  category?: Types.ObjectId;
  status?: string;
}

const orderProductSchema = new Schema<IOrderProduct>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: [orderProductSchema], default: [] },
    total: { type: Number, required: true, default: 0 },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

const Order = model<IOrder>('Order', orderSchema);
export default Order;
