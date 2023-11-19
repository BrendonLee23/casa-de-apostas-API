import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function paymentRequiredError(info: string): ApplicationError {
  return {
    name: 'paymentRequiredError',
    message: `Payment Required or insufficient: ${info}`,
    status: httpStatus.PAYMENT_REQUIRED,
  };
}
