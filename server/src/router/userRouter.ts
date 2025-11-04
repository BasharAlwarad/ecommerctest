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
// userRouter.get(`/`, getAllUsers);
// userRouter.post(`/`, createUser);

userRouter.route(`/:id`).get(getUser).put(updateUser).delete(deleteUser);
// userRouter.get(`/:id`, getUser);
// userRouter.put(`/:id`, updateUser);
// userRouter.delete(`/:id`, deleteUser);
