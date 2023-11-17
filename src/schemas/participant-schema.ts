import joi from 'joi';
import { CreateParticipant } from '../protocols';

export const participantSchema = joi.object<CreateParticipant>({
  name: joi.string().required(),
  balance: joi.number().integer().required(),
});
