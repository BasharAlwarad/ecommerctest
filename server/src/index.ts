import express from 'express';

import { userRouter } from './router/userRouter.ts';
import errorHandler, { AppError } from './utils/errorHandler.ts';

const PORT = 3000;
// comments
// comments
// comments

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'server is running' });
});

app.use(`/users`, userRouter);

app.use((req, res, next) => {
  // forward 404 to global error handler
  next(new AppError('page not found', 404));
});

// global error handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:3000 `)
);
