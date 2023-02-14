import { RegisterUserBody } from "@src/schemas/user";
import { createUser } from "@src/services/user";
import logger from "@src/util/logger";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// can be exported elsewhere for i18n
const USER_CREATE_ERROR_STRING = "Invalid information provided.";

export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await createUser({ username, password });
    return res.status(StatusCodes.CREATED).send({ status: "SUCCESS", id: user.id });
  } catch (e) {
    //best practices would have this call a error handler which would accept many kinds of errors and return different statuses
    //depending on the error. But for time and simplicity a simple 400 will do.
    return res.status(StatusCodes.BAD_REQUEST).send(USER_CREATE_ERROR_STRING);
  }
}
