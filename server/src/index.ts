import express from 'express';

import { userRouter } from './router/userRouter.ts';
import { productsRouter } from './router/productsRouter.ts';
import { categoriesRouter } from './router/categoriesRouter.ts';
import { ordersRouter } from './router/ordersRouter.ts';
import errorHandler, { AppError } from './utils/errorHandler.ts';
import { mongoDBConnect } from './db/mongodb.ts';

const PORT = process.env.PORT;

const app = express();

// parse JSON bodies
app.use(express.json());

mongoDBConnect();

app.get('/', (req, res) => {
  res.json({ message: 'server is running' });
});

app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);

app.use((req, res, next) => {
  // forward 404 to global error handler
  next(new AppError('page not found', 404));
});

// global error handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:3000 `)
);
