import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function conflictError(): ApplicationError {
  return {
    name: 'conflictError',
    message: 'Conflict Error in application',
    status: httpStatus.CONFLICT,
  };
}
