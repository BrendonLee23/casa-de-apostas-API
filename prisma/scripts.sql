-- Tabela Participant
CREATE TABLE Participant (
  id SERIAL PRIMARY KEY,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(255) NOT NULL,
  balance INT NOT NULL CHECK (balance >= 1000) -- Saldo inicial não pode ser menor que R$ 10,00
);

-- Tabela Game
CREATE TABLE Game (
  id SERIAL PRIMARY KEY,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  homeTeamName VARCHAR(255) NOT NULL,
  awayTeamName VARCHAR(255) NOT NULL,
  homeTeamScore INT NOT NULL,
  awayTeamScore INT NOT NULL,
  isFinished BOOLEAN NOT NULL DEFAULT FALSE -- Jogo não finalizado por padrão
);

-- Tabela Bet
CREATE TABLE Bet (
  id SERIAL PRIMARY KEY,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  homeTeamScore INT NOT NULL,
  awayTeamScore INT NOT NULL,
  amountBet INT NOT NULL,
  gameId INT REFERENCES Game(id),
  participantId INT REFERENCES Participant(id),
  status VARCHAR(255) NOT NULL,
  amountWon INT, -- Valor ganho em centavos
  CHECK (status IN ('PENDING', 'WON', 'LOST')), -- Status deve ser PENDING, WON ou LOST
  CHECK (amountBet > 0), -- Valor da aposta deve ser maior que zero
  CHECK (amountWon >= 0) -- Valor ganho não pode ser negativo
);
