import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function notFoundError(info: string): ApplicationError {
  return {
    name: 'notFoundError',
    message: `Not Found Error: ${info}`,
    status: httpStatus.NOT_FOUND,
  };
}
