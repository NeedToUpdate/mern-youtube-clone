import { SOMETHING_WENT_WRONG_STRING } from "@src/constants/misc";
import { UserDTO } from "@src/dtos/user.dto";
import { ListQuery } from "@src/schemas/crud.schema";
import { RegisterUserBody, RetrieveUser } from "@src/schemas/user.schema";
import { createUser, getAllUsers, getUserByUsername } from "@src/services/user.service";
import logger from "@src/util/logger";
import { omit } from "@src/util/misc";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// can be exported elsewhere for i18n
const USER_CREATE_ERROR_STRING = "Invalid information provided.";
const USER_NOT_FOUND_ERROR = "This user does not exist.";

export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response) {
  const { username, password } = req.body;

  try {
    const user = await createUser({ username, password });
    return res.status(StatusCodes.CREATED).send({ status: "SUCCESS", id: user.id });
  } catch (e) {
    //best practices would have this call a error handler which would accept many kinds of errors and return different statuses
    //depending on the error. But for time and simplicity a simple 400 will do.
    return res.status(StatusCodes.BAD_REQUEST).send({ status: "ERROR", message: USER_CREATE_ERROR_STRING });
  }
}

export async function getUserByUsernameHandler(req: Request<RetrieveUser>, res: Response) {
  const { username } = req.params;

  try {
    const user = await getUserByUsername(username);
    if (user) {
      return res.status(StatusCodes.OK).send({ status: "SUCCESS", user: new UserDTO(user) });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ status: "ERROR", message: USER_NOT_FOUND_ERROR });
    }
  } catch (e) {
    //best practices would have this call a error handler which would accept many kinds of errors and return different statuses
    //depending on the error. But for time and simplicity a simple 400 will do.
    return res.status(StatusCodes.BAD_REQUEST).send({ status: "ERROR", message: USER_NOT_FOUND_ERROR });
  }
}

export async function getAllUsersHandler(req: Request<{}, {}, {}, ListQuery>, res: Response) {
  const { skip, take } = req.query;
  //http params are always strings, but zod will make sure they're numeric
  try {
    const users = await getAllUsers(parseInt(skip), parseInt(take));
    return res.status(StatusCodes.OK).send({ status: "SUCCESS", users: users.map((user) => new UserDTO(user)) });
  } catch (e) {
    logger.error(e);
    //if we cant get a list of users from the above function something must be wrong with the server
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: "ERROR", message: SOMETHING_WENT_WRONG_STRING });
  }
}

//you would also implement update and delete user handlers here, but that is not needed for the project
