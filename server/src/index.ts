import express from 'express';

import { userRouter } from './router/userRouter.ts';

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'server is running' });
});

app.use(`/users`, userRouter);

app.use(/.*/, (req, res) => {
  res.status(404).json({ message: 'page not found' });
});

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:3000 `)
);
