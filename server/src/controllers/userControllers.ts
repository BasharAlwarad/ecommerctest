import type { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'get all users' });
  } catch (error) {
    console.error(error);
  }
};
export const getUser = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'get user' });
  } catch (error) {
    console.error(error);
  }
};
export const createUser = (req: Request, res: Response) => {
  try {
    res.status(201).json({ message: 'create user' });
  } catch (error) {
    console.error(error);
  }
};
export const updateUser = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'update user' });
  } catch (error) {
    console.error(error);
  }
};
export const deleteUser = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'delete user' });
  } catch (error) {
    console.error(error);
  }
};
