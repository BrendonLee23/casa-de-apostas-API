/*
  Warnings:

  - A unique constraint covering the columns `[gameId]` on the table `Bet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[participantId]` on the table `Bet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bet_gameId_key" ON "Bet"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Bet_participantId_key" ON "Bet"("participantId");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
