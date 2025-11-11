import { Router } from 'express';

import {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/ordersControllers.ts';

export const orderRouters = Router();

orderRouters.route('/').get(getAllOrders).post(createOrder);

orderRouters.route(`/:id`).get(getOrder).put(updateOrder).delete(deleteOrder);
