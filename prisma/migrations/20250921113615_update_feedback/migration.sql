/*
  Warnings:

  - You are about to drop the column `allowContact` on the `Feedback` table. All the data in the column will be lost.
  - Made the column `contactId` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneE164` on table `FeedbackContact` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_contactId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "allowContact",
ALTER COLUMN "contactId" SET NOT NULL;

-- AlterTable
ALTER TABLE "FeedbackContact" ALTER COLUMN "phoneE164" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "FeedbackContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
