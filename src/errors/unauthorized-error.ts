import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function unauthorizedError(): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: 'Not authorized to access',
    status: httpStatus.UNAUTHORIZED,
  };
}
