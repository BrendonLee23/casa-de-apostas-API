import joi from "joi";
import { CreateGame } from "@/protocols";

export const gameSchema = joi.object<CreateGame>({
    homeTeamName: joi.string().required(),
    awayTeamName: joi.string().required(),
})