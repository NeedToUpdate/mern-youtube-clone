import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const UNAUTHORIZED_MESSAGE = "Login required.";

export function loginRequired(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).send({ status: "UNAUTHORIZED", message: "Login required." });
  }

  return next();
}
