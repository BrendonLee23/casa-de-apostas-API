import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

type AppError = Error & {
  type: string
}

export default function errorHandlingMiddleware(error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  if (error.name === "NotFound") {
    return res.status(httpStatus.NOT_FOUND).send("NotFound")
  }

  if (error.name === "Conflict") {
    return res.status(httpStatus.CONFLICT).send("Conflict")
  }

  if (error.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send("UnauthorizedError")
  }

  if (error.name === "BadRequestError") {
    return res.status(httpStatus.BAD_REQUEST).send("BadRequestError")
  }

  console.log(error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR);
}