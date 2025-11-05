import type { Request, Response, NextFunction } from 'express';
import Category from '../models/categoriesModels.ts';
import Product from '../models/productsModels.ts';
import { AppError } from '../utils/errorHandler.ts';

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ results: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return next(new AppError('Category not found', 404));
    // Optionally include products in this category
    const products = await Product.find({ category: category._id }).select(
      'name price'
    );
    res.status(200).json({ data: { category, products } });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    if (!name) return next(new AppError('Missing required field: name', 400));
    const existing = await Category.findOne({ name });
    if (existing) return next(new AppError('Category already exists', 409));
    const category = await Category.create({ name, description });
    res.status(201).json({ data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const category = await Category.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!category) return next(new AppError('Category not found', 404));
    res.status(200).json({ data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return next(new AppError('Category not found', 404));
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};
