import { LoginBody } from "@src/schemas/auth.schema";
import { findUserByUsername } from "@src/services/user.service";
import { addSessionData } from "@src/util/auth.util";
import { omit } from "@src/util/misc";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const INVALID_USER_ERROR = "Invalid username or password.";

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);

  if (!user || !user.comparePassword(password)) {
    //we don't want to tell the user if a user's existence by giving a different response of incorrect password or user not found
    return res.status(StatusCodes.UNAUTHORIZED).send(INVALID_USER_ERROR);
  }

  const jwtPayload = omit(user.toJSON(), ["password", "comparePassword"]);

  await addSessionData(res, jwtPayload);

  return res.status(StatusCodes.OK).send({ status: "SUCCESS" });
}
