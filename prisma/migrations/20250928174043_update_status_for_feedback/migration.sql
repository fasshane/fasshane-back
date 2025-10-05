/*
  Warnings:

  - The values [PENDING,APPROVED,HIDDEN,SPAM] on the enum `FeedbackStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FeedbackStatus_new" AS ENUM ('UNTRIAGED', 'NEEDS_MORE_INFO', 'IN_BACKLOG', 'IN_PROGRESS', 'RESOLVED', 'WONT_FIX', 'DUPLICATE');
ALTER TABLE "Feedback" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Feedback" ALTER COLUMN "status" TYPE "FeedbackStatus_new" USING ("status"::text::"FeedbackStatus_new");
ALTER TYPE "FeedbackStatus" RENAME TO "FeedbackStatus_old";
ALTER TYPE "FeedbackStatus_new" RENAME TO "FeedbackStatus";
DROP TYPE "FeedbackStatus_old";
ALTER TABLE "Feedback" ALTER COLUMN "status" SET DEFAULT 'UNTRIAGED';
COMMIT;

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "status" SET DEFAULT 'UNTRIAGED';
