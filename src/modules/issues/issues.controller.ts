import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issues.service";
import type { JwtPayload } from "jsonwebtoken";

const issueCreate = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as JwtPayload;
    const result = await issueService.issueCreate(req.body, id);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
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

export const issueController = {
  issueCreate,
};
