import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function unauthorizedError(info: string): ApplicationError {
  return {
    name: 'unauthorizedError',
    message: `Not authorized to proceed: ${info}`,
    status: httpStatus.UNAUTHORIZED,
  };
}
