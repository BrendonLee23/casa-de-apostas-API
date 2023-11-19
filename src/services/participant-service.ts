import { badRequestError } from '../errors/bad-request-error';
import { CreateParticipant } from '../protocols';
import { participantRepository } from '../repositories/participant-repository';
import { conflictError } from '../errors/conflict-error';

async function getParticipants() {
  return participantRepository.getAllParticipants();
}

async function postParticipants(participantBody: CreateParticipant) {
  const name = participantBody.name;
  const participantAlreadyExists = await participantRepository.findParticipantByName(name);
  if (participantAlreadyExists) throw conflictError('This name already exists');
  if (participantBody.balance < 1000) throw badRequestError('Minimum value required 1000');
  const result = participantRepository.createParticipants(participantBody);
  return result;
}

export const participantService = {
  getParticipants,
  postParticipants,
};
