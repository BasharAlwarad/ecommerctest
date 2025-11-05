import { Router } from 'express';
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoriesControllers.ts';

export const categoriesRouter = Router();

categoriesRouter.route('/').get(getAllCategories).post(createCategory);
categoriesRouter
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);
