/**
 * Miscellaneous shared classes go here.
 */

import { StatusCodes } from "http-status-codes";

/**
 * Error with status code and message
 */
export class RouteError extends Error {
  status: StatusCodes;
  constructor(status: StatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}
