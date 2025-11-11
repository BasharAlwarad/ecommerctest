import express from 'express';

import { db } from './db/index.ts';

import { userRouter } from './router/userRouter.ts';
import { productsRouter } from './router/productsRouter.ts';
import { orderRouters } from './router/orderRouters.ts';
import { categoriesRouter } from './router/categoriesRouter.ts';

const PORT = 3000;
// comments
// comments
// comments

const app = express();
app.use(express.json());

db();
app.get('/', (req, res) => {
  res.json({ message: 'server is running' });
});

app.use(`/users`, userRouter);
app.use(`/products`, productsRouter);
app.use(`/orders`, orderRouters);
app.use(`/categories`, categoriesRouter);

app.use(/.*/, (req, res) => {
  res.status(404).json({ message: 'page not found' });
});

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:3000 `)
);
