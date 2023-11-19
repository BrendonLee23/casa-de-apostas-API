import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function conflictError(info: string): ApplicationError {
  return {
    name: 'conflictError',
    message: `Conflict Error in application: ${info}`,
    status: httpStatus.CONFLICT,
  };
}
