import type { Request, Response, NextFunction } from 'express';
import Product from '../models/productsModels.ts';
import Category from '../models/categoriesModels.ts';
import { AppError } from '../utils/errorHandler.ts';

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.status(200).json({ results: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category', 'name');
    if (!product) return next(new AppError('Product not found', 404));
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description, category: categoryId, stock } = req.body;
    if (!name || price == null)
      return next(new AppError('Missing required fields', 400));
    if (categoryId) {
      const cat = await Category.findById(categoryId);
      if (!cat) return next(new AppError('Category not found', 404));
    }
    const product = await Product.create({
      name,
      price,
      description,
      category: categoryId,
      stock,
    });
    res.status(201).json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!product) return next(new AppError('Product not found', 404));
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return next(new AppError('Product not found', 404));
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
