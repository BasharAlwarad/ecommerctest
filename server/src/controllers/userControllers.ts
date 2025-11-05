import type { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync.ts';
import User from '../models/usersModels.ts';
import { AppError } from '../utils/errorHandler.ts';

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.find().select('-password').populate('orders');
  res.status(200).json({ results: users.length, data: users });
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-password').populate('orders');
  if (!user) throw new AppError('User not found', 404);
  res.status(200).json({ data: user });
});

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new AppError('Missing required fields', 400);
  const user = await User.create({ name, email, password });
  res
    .status(201)
    .json({ data: { id: user._id, name: user.name, email: user.email } });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select('-password');
  if (!user) throw new AppError('User not found', 404);
  res.status(200).json({ data: user });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError('User not found', 404);
  res.status(204).json({});
});
