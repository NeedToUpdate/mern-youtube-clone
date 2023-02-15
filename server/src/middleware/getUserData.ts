import { getSessionData } from "@src/util/auth.util";
import { NextFunction, Request, Response } from "express";

/**
 * Gets user data from jwt cookie
 */
export async function getUserData(req: Request, res: Response, next: NextFunction) {
  const jwtToken = await getSessionData(req);
  if (!jwtToken) return next();

  res.locals.user = jwtToken;

  return next();
}
