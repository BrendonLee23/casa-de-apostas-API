import { Bet, Game, Participant } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
  status: number;
};

export type CreateParticipant = Omit<Participant, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateGame = Omit<
  Game,
  'id' | 'createdAt' | 'updatedAt' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'
>;

export type CreateGameFinish = Omit<
  Game,
  'id' | 'createdAt' | 'updatedAt' | 'homeTeamName' | 'awayTeamName' | 'isFinished'
>;

export type CreateBet = Omit<Bet, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'amountWon'>;

export type BetInfo = Omit<
  Bet,
  'id' | 'createdAt' | 'updatedAt' | 'status' | 'amountWon' | 'gameId' | 'participantId' | 'status' | 'amountWon'
>;

export type GameInfo = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  isFinished: boolean;
};

export type betBody = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  status: string;
  amountWon: number;
  amountBet: number;
  gameId: number;
  participantId: number;
};

export type ParticipantBalance = Omit<Participant, 'createdAt' | 'updatedAt' | 'name'>;

export type Bets = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  homeTeamScore: number;
  awayTeamScore: number;
  status: string;
  amountWon: number;
  amountBet: number;
  gameId: number;
  participantId: number;
}[];

export type Params = {
  id: number;
};
