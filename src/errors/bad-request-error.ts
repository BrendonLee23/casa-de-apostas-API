import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function badRequestError(): ApplicationError {
  return {
    name: 'badRequestError',
    message: 'The request was invalid',
    status: httpStatus.BAD_REQUEST,
  };
}
