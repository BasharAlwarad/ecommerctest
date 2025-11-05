import type { Request, Response, NextFunction, RequestHandler } from 'express';

// Small helper to wrap async route handlers and forward errors to next()
export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
