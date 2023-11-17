/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Bet_gameId_key";

-- DropIndex
DROP INDEX "Bet_participantId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Participant_name_key" ON "Participant"("name");
