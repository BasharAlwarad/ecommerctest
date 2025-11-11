import type { Request, Response } from 'express';
import { Order } from '../models/orderModel.ts';
import { User } from '../models/userModel.ts';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    // populate user and products -> category
    const orders = await Order.find()
      .populate('user')
      .populate({
        path: 'products',
        populate: { path: 'category' },
      });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('user')
      .populate({
        path: 'products',
        populate: { path: 'category' },
      });
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body; // expect { user: userId?, products: [productId,...], totalPrice? }
    const order = await Order.create(data);

    // if a user was provided, push this order into the user's orders array
    if (data.user) {
      await User.findByIdAndUpdate(data.user, { $push: { orders: order._id } });
    }

    const populated = await Order.findById(order._id)
      .populate('user')
      .populate({
        path: 'products',
        populate: { path: 'category' },
      });

    res.status(201).json({ order: populated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true })
      .populate('user')
      .populate({ path: 'products', populate: { path: 'category' } });
    res.status(200).json({ order: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (order && order.user) {
      await User.findByIdAndUpdate(order.user, {
        $pull: { orders: order._id },
      });
    }
    res.status(200).json({ message: 'delete order' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};
