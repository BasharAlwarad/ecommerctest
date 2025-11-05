import { Router } from 'express';
import {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/ordersControllers.ts';

export const ordersRouter = Router();

ordersRouter.route('/').get(getAllOrders).post(createOrder);
ordersRouter.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder);
