import { Request, Response } from "express";

import { RouteError } from "@src/other/classes";
import jsonwebtoken from "jsonwebtoken";

import envVars from "../constants/envVars";
import { StatusCodes } from "http-status-codes";

// **** Variables **** //

// Errors
const Errors = {
  ParamFalsey: "Param is falsey",
  Validation: "JSON-web-token validation failed.",
} as const;

// Options
const Options = {
  expiresIn: envVars.JWT.Exp,
};

// **** Functions **** //

/**
 * Get session data from request object (i.e. ISessionUser)
 */
export function getSessionData<T>(req: Request): Promise<string | T | undefined> {
  const { Key } = envVars.COOKIES,
    jwt = req.signedCookies[Key];
  return _decode(jwt);
}

/**
 * Add a JWT to the response
 */
export async function addSessionData(res: Response, data: string | object): Promise<Response> {
  if (!res || !data) {
    throw new RouteError(StatusCodes.BAD_REQUEST, Errors.ParamFalsey);
  }
  // Setup JWT
  const jwt = await _sign(data),
    { Key, Options } = envVars.COOKIES;
  // Return
  return res.cookie(Key, jwt, Options);
}

/**
 * Remove cookie
 */
export function clearCookie(res: Response): Response {
  const { Key, Options } = envVars.COOKIES;
  return res.clearCookie(Key, Options);
}

// **** Helper Functions **** //

/**
 * Encrypt data and return jwt.
 */
function _sign(data: string | object | Buffer): Promise<string> {
  return new Promise((res, rej) => {
    jsonwebtoken.sign(data, envVars.JWT.Secret, Options, (err, token) => {
      return err ? rej(err) : res(token || "");
    });
  });
}

/**
 * Decrypt JWT and extract client data.
 */
function _decode<T>(jwt: string): Promise<string | undefined | T> {
  return new Promise((res) => {
    jsonwebtoken.verify(jwt, envVars.JWT.Secret, (err, decoded) => {
      return err ? res(undefined) : res(decoded as T);
    });
  });
}
