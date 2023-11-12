import { CreateParticipant } from "@/protocols";
import { participantRepository } from "@/repositories/participant-repository";


async function getParticipants(){
    return participantRepository.getAllParticipants()
}

async function postParticipants( participantBody: CreateParticipant){
    const result = participantRepository.createParticipants( participantBody );
    return result
}

export const participantService = {
    getParticipants,
    postParticipants
    };
