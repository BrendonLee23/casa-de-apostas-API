import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

type AppError = Error & {
  name: string;
  message: string;
  status: number;
};

export default function errorHandlingMiddleware(
  error: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  // eslint-disable-next-line prettier/prettier
  const expectedErrors = ['notFoundError', 'conflictError', 'unauthorizedError', 'badRequestError', 'unprocessableEntityError', 'paymentRequiredError'];

  if (expectedErrors.includes(error.name)) {
    return res.status(error.status).send(error.message);
  }
  console.log(error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error.' });
}
