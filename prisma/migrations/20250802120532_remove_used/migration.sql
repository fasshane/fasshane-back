/*
  Warnings:

  - You are about to drop the column `used` on the `EmailActivationToken` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `MfaCode` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "EmailActivationToken_userId_used_idx";

-- DropIndex
DROP INDEX "MfaCode_userId_used_idx";

-- AlterTable
ALTER TABLE "EmailActivationToken" DROP COLUMN "used";

-- AlterTable
ALTER TABLE "MfaCode" DROP COLUMN "used";

-- CreateIndex
CREATE INDEX "EmailActivationToken_userId_idx" ON "EmailActivationToken"("userId");

-- CreateIndex
CREATE INDEX "MfaCode_userId_idx" ON "MfaCode"("userId");
