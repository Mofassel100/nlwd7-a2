import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issues.service";
import type { JwtPayload } from "jsonwebtoken";
import type TUser from "../auth/auth.interface";
// Issue Created successfully
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
const getAllIssuesFromDB = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue retired all successfully",
      data: result.rows,
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
// Issue single get successfully
const getSingleIssuesFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueService.getSingleIssuesFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
// Issues updated successfully
const IssuesUpdatedFromDB = async (req: Request, res: Response) => {
  const { id: issueId } = req.params;
  const user = req.user as JwtPayload;
  const data = req.body;
  try {
    const result = await issueService.IssuesUpdatedFromDB(
      issueId as string,
      user as TUser,
      data,
    );

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
// Issue Deleted
const IssueDeletedFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  try {
    const result = await issueService.issueDeletedFromDB(
      id as string,
      user as TUser,
    );

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const issueController = {
  issueCreate,
  getAllIssuesFromDB,
  getSingleIssuesFromDB,
  IssuesUpdatedFromDB,
  IssueDeletedFromDB,
};
