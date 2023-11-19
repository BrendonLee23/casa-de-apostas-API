import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function notFoundError(): ApplicationError {
  return {
    name: 'notFoundError',
    message: 'No result for this search!',
    status: httpStatus.NOT_FOUND,
  };
}
