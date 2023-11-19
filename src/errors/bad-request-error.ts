import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function badRequestError(info: string): ApplicationError {
  return {
    name: 'badRequestError',
    message: `The request was invalid: ${info}`,
    status: httpStatus.BAD_REQUEST,
  };
}
