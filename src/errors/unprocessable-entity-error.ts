import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function unprocessableEntityError(): ApplicationError {
  return {
    name: 'unprocessableEntityError',
    message: 'UnprocessableEntity',
    status: httpStatus.UNPROCESSABLE_ENTITY,
  };
}
