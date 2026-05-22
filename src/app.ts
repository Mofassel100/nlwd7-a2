/* eslint-disable @typescript-eslint/no-explicit-any */

import cors from "cors";
import CookieParser from "cookie-parser";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { authRouter } from "./modules/auth/auth.router";
import { issueRouter } from "./modules/issues/issues.router";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(CookieParser());
app.use(express.json());
app.use(express.text());

app.use("/api/auth", authRouter);
app.use("/api/issues", issueRouter);

// Basic route
app.get("/", async (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "API is working",
  });
});

app.use(globalErrorHandler);
// app.use(notFound);

export default app;
