import type { NextFunction, Request, Response } from "express";

import { authService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";
import { setAuthCookie } from "../../utility/setCookie";

const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.userSignup(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const userLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.userLogin(req.body);

    // console.log();
    // setAuthCookie(res, result);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successfully",
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const authController = {
  userSignup,
  userLogin,
};
