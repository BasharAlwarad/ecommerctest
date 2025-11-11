import type { Request, Response } from 'express';
import { User } from '../models/userModel.ts';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // populate orders -> products -> category
    const users = await User.find().populate({
      path: 'orders',
      populate: {
        path: 'products',
        populate: { path: 'category' },
      },
    });
    res.status(200).json({ message: 'get all users', users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path: 'orders',
      populate: {
        path: 'products',
        populate: { path: 'category' },
      },
    });
    res.status(200).json({ message: 'get user', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await User.create(data);
    res.status(201).json({ message: 'create user', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({
      path: 'orders',
      populate: { path: 'products', populate: { path: 'category' } },
    });
    res.status(200).json({ message: 'update user', user: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'delete user' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal server error' });
  }
};
