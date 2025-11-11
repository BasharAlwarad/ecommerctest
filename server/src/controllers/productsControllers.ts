import type { Request, Response } from 'express';
import { Product } from '../models/productModel.ts';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category');
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const product = await Product.create(data);
    const populated = await Product.findById(product._id).populate('category');
    res.status(201).json({ product: populated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('category');
    res.status(200).json({ product: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'delete Product' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};
