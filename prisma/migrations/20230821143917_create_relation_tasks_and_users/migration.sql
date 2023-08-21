/*
  Warnings:

  - You are about to drop the column `usersId` on the `tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_usersId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "usersId",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
