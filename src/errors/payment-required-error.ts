import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function paymentRequiredError(): ApplicationError {
  return {
    name: 'paymentRequiredError',
    message: 'Payment Required or insufficient',
    status: httpStatus.PAYMENT_REQUIRED,
  };
}
