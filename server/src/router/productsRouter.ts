import { Router } from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsControllers.ts';

export const productsRouter = Router();

productsRouter.route('/').get(getAllProducts).post(createProduct);
productsRouter
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);
