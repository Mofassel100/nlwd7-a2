/* eslint-disable @typescript-eslint/no-unused-vars */

import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
export default globalErrorHandler;
