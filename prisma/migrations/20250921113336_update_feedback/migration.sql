/*
  Warnings:

  - You are about to drop the column `locale` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Feedback` table. All the data in the column will be lost.
  - Made the column `ratingFood` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ratingService` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `visitorId` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deviceHash` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ipHash` on table `Feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uaHash` on table `Feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "locale",
DROP COLUMN "source",
ALTER COLUMN "ratingFood" SET NOT NULL,
ALTER COLUMN "ratingService" SET NOT NULL,
ALTER COLUMN "visitorId" SET NOT NULL,
ALTER COLUMN "deviceHash" SET NOT NULL,
ALTER COLUMN "ipHash" SET NOT NULL,
ALTER COLUMN "uaHash" SET NOT NULL;
