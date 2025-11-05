import { Router } from 'express';

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userControllers.ts';
export const userRouter = Router();

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route(`/:id`).get(getUser).put(updateUser).delete(deleteUser);
