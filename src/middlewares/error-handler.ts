import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

type AppError = Error & {
  type: string
}

export default function errorHandlingMiddleware(error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  if (error.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send("NotFound")
  }

  if (error.name === "ConflictError") {
    return res.status(httpStatus.CONFLICT).send("Conflict")
  }

  if (error.name === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send("Unauthorized")
  }

  if (error.name === "BadRequestError") {
    return res.status(httpStatus.BAD_REQUEST).send("BadRequest")
  }

  if (error.name === "UnprocessableEntityError") {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send("UnprocessableEntity")
  }

  if (error.name === "PaymentRequiredError") {
    return res.status(httpStatus.PAYMENT_REQUIRED).send("PaymentRequired")
  }

  console.log(error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR);
}