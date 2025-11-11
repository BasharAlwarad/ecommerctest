import type { Request, Response } from 'express';
import { Category } from '../models/categoriesModel.ts';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    // populate virtual products
    const categories = await Category.find().populate('products');
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate('products');
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const category = await Category.create(data);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('products');
    res.status(200).json({ category: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'delete category' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};
