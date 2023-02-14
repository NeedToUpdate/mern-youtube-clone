/**
 * Setup express server.
 */

import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import "express-async-errors";

import BaseRouter from "@src/routes/api";
import Paths from "@src/routes/constants/Paths";

import envVars from "@src/constants/envVars";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import { NodeEnvs } from "@src/constants/misc";
import { RouteError } from "@src/other/classes";

import logger from "./util/logger";

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

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (envVars.NODE_ENV !== NodeEnvs.Test) {
    logger.error(err);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

// ** Front-End Content ** //

// Set views directory (html)
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// Nav to login pg by default
app.get("/", (_: Request, res: Response) => {
  res.sendFile("login.html", { root: viewsDir });
});

// Redirect to login if not logged in.
app.get("/users", (req: Request, res: Response) => {
  const jwt = req.signedCookies[envVars.COOKIES.Key];
  if (!jwt) {
    res.redirect("/");
  } else {
    res.sendFile("users.html", { root: viewsDir });
  }
});

// **** Export default **** //

export default app;
