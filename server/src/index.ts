import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { db } from './db/index.ts';
import cors from 'cors';

import { userRouter } from './router/userRouter.ts';
import { productsRouter } from './router/productsRouter.ts';
import { orderRouters } from './router/orderRouters.ts';
import { categoriesRouter } from './router/categoriesRouter.ts';

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// make __dirname work in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from src/public
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

db();
app.get('/', (req, res) => {
  // res.json({ message: 'server is running' });
  res.send('<h1> hello </h1>');
});

// Serve the test HTML (with its CSS/JS) from the public folder
app.get('/test', (req, res) => {
  res.sendFile(path.join(publicPath, 'test', 'index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(publicPath, 'test', 'index.html'));
});

// small JSON endpoint the static page can ping
app.get('/test-api', (req, res) => {
  res.json({ message: 'pong', time: new Date().toISOString() });
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
