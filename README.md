# First Hand News - Desafio da TopNews
Aplicação de back-end para o desafio técnico da vaga de back-end node júnior.

## Como funciona?
Este projeto é uma API REST para atender a aplicação de notícias rápidas da TopNews. Ela possui apenas uma entidade: `news`. Para entidade, foram criados cinco rotas:

- GET `/news`
- GET `/news/:id`
- POST `/news`
- PUT `/news/:id`
- DELETE `/news/:id`

Cada uma das rotas contemplam as convenções de respostas para APIs REST.

## Tecnologias utilizadas
Para este projeto, foram utilizadas:

- Node
- Express
- Typescript
- Prisma
- Postgres
- Jest e Supertest