import type { Request, Response, NextFunction } from 'express';

// Very small AppError used for teaching.
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Minimal Express error handler: return status code and message.
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err?.statusCode ?? 500;
  const message = err?.message ?? 'Internal Server Error';

  // In teaching mode we avoid extra logic — just return the basics.
  res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'fail',
    message,
  });
};

export default errorHandler;
