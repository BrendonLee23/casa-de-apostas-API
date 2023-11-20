Link do Deploy: https://desafio-tecnico-api-7q98.onrender.com

# Desafio Técnico - Quer Apostar Quanto?

## Deploy
[Link do Deploy](https://desafio-tecnico-api-7q98.onrender.com)

## Requisitos Técnicos
- TypeScript
- Node + Express
- Prisma (ORM)
- Postgres
- Jest e Supertest

## Entidades

### Participant

{
  "id": 1,
  "createdAt": "2023-09-27T19:22:50.503Z",
  "updatedAt": "2023-09-27T19:22:50.503Z",
  "name": "João",
  "balance": 1000
}
Game
{
  "id": 1,
  "createdAt": "2023-09-27T19:22:50.503Z",
  "updatedAt": "2023-09-27T19:22:50.503Z",
  "homeTeamName": "Flamengo",
  "awayTeamName": "Fluminense",
  "homeTeamScore": 3,
  "awayTeamScore": 1,
  "isFinished": false
}
Bet
{
  "id": 1,
  "createdAt": "2023-09-27T19:22:50.503Z",
  "updatedAt": "2023-09-27T19:22:50.503Z",
  "homeTeamScore": 2,
  "awayTeamScore": 3,
  "amountBet": 1000,
  "gameId": 1,
  "participantId": 1,
  "status": "PENDING",
  "amountWon": null
}
# Rotas
- **POST** `/participants`
- **POST** `/games`
- **POST** `/bets`
- **POST** `/games/:id/finish`
- **GET** `/participants`
- **GET** `/games`
- **GET** `/games/:id`

# Rotas
- **POST** `/participants`
- **POST** `/games`
- **POST** `/bets`
- **POST** `/games/:id/finish`
- **GET** `/participants`
- **GET** `/games`
- **GET** `/games/:id`

# Regras de Negócio
- Participante não pode ter saldo inicial menor que R$ 10,00.
- Não é possível criar uma aposta com valor maior que o saldo do participante.
- Não é possível criar uma aposta em um jogo já finalizado.
- Ao criar uma aposta, o valor deve ser subtraído imediatamente do saldo do participante.
- Um jogo só pode ser finalizado se ainda não tiver sido encerrado anteriormente.
- Ao finalizar um jogo, o placar deve ser atualizado.
- Ao finalizar um jogo, todas as apostas devem ser atualizadas conforme as regras especificadas.
- O valor ganho em uma aposta segue uma fórmula específica com taxa da casa.
- A taxa da casa é 0.3 (30%).
- O valor final deve ser arredondado para baixo em caso de números fracionários.

# Como testar
1. Acesse [Link do Deploy](https://desafio-tecnico-api-7q98.onrender.com).
2. Utilize as rotas especificadas para criar participantes, jogos e apostas.
3. Observe as respostas e resultados conforme as regras de negócio.
4. Certifique-se de seguir o contrato da API e as instruções fornecidas.

Boa sorte!



