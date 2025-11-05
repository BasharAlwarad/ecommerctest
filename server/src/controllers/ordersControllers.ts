import type { Request, Response, NextFunction } from 'express';
import Order from '../models/ordersModels.ts';
import User from '../models/usersModels.ts';
import Product from '../models/productsModels.ts';
import { AppError } from '../utils/errorHandler.ts';

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('category', 'name')
      .populate({
        path: 'products.product',
        model: 'Product',
        select: 'name price',
      });
    res.status(200).json({ results: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('category', 'name')
      .populate({
        path: 'products.product',
        model: 'Product',
        select: 'name price',
      });
    if (!order) return next(new AppError('Order not found', 404));
    res.status(200).json({ data: order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user: userId,
      products,
      total,
      category: categoryId,
      status,
    } = req.body;
    if (
      !userId ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    )
      return next(
        new AppError('Missing required fields: user and products', 400)
      );

    const user = await User.findById(userId);
    if (!user) return next(new AppError('User not found', 404));

    // Optionally validate all product ids
    for (const p of products) {
      const prod = await Product.findById(p.product);
      if (!prod)
        return next(new AppError(`Product not found: ${p.product}`, 404));
    }

    const order = await Order.create({
      user: userId,
      products,
      total: total ?? 0,
      category: categoryId,
      status,
    });

    // push order id into user's orders array (best-effort)
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.status(201).json({ data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const order = await Order.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!order) return next(new AppError('Order not found', 404));
    res.status(200).json({ data: order });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return next(new AppError('Order not found', 404));

    // remove order id from user's orders array
    await User.findByIdAndUpdate(order.user, { $pull: { orders: order._id } });

    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
