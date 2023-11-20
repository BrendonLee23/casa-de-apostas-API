import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function participantAlredyExitError(): ApplicationError {
  return {
    name: 'ParticipantAlredyExit',
    message: 'There is already an participant with given name',
    status: httpStatus.CONFLICT,
  };
}
