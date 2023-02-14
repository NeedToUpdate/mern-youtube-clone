/**
 * Setup express server.
 */

import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import "express-async-errors";

import envVars from "@src/constants/envVars";

import { NodeEnvs } from "@src/constants/misc";
import { RouteError } from "@src/other/classes";

import logger from "./util/logger";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

import userRoute from "@src/routes/user";

// **** Variables **** //

const app = express();

// **** Setup **** //

// Basic middleware
app.use(
  cors({
    origin: envVars.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(envVars.COOKIES.Secret));

// Show routes called in console during development
if (envVars.NODE_ENV === NodeEnvs.Dev) {
  app.use(morgan("dev"));
}

// Security
if (envVars.NODE_ENV === NodeEnvs.Production) {
  app.use(helmet());
}

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (envVars.NODE_ENV !== NodeEnvs.Test) {
    logger.error(err);
  }
  let status = StatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

//routes

app.use("/api/user", userRoute);

// **** Export default **** //

export default app;
