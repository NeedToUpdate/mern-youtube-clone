import { verify } from "@src/util/auth.util";
import { NextFunction, Request, Response } from "express";

/**
 * Gets user data from jwt cookie
 */
export function getUserData(req: Request, res: Response, next: NextFunction) {
  const jwtToken = (req.headers.authorization || req.cookies.jwt_token || "").replace(/^Bearer\s/, "");

  if (!jwtToken) return next();

  const decoded = verify(jwtToken);

  if (decoded) res.locals.user = decoded;

  return next();
}
