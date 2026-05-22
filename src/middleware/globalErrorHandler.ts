/* eslint-disable @typescript-eslint/no-unused-vars */

import type { NextFunction, Request, Response } from "express";
import { success } from "zod";
import { fa } from "zod/locales";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Error) {
    success: false;
    message: err.message;
    stak: err.stack;
  }
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
export default globalErrorHandler;
