import { BetInfo } from '../protocols';

// Adicionando parâmetros homeTeamScore e awayTeamScore à função
function calculateTotalWinningBetsAmount(betInfos: BetInfo[], homeTeamScore: number, awayTeamScore: number) {
  return betInfos.reduce((acc, bet) => {
    if (homeTeamScore === bet.homeTeamScore && awayTeamScore === bet.awayTeamScore) {
      return acc + bet.amountBet;
    }
    return acc;
  }, 0);
}

export default calculateTotalWinningBetsAmount;
