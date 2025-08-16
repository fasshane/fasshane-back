/*
  Warnings:

  - You are about to drop the `MfaToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MfaToken" DROP CONSTRAINT "MfaToken_userId_fkey";

-- DropTable
DROP TABLE "MfaToken";

-- CreateTable
CREATE TABLE "MfaCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MfaCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailActivationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailActivationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MfaCode_code_key" ON "MfaCode"("code");

-- CreateIndex
CREATE INDEX "MfaCode_userId_used_idx" ON "MfaCode"("userId", "used");

-- CreateIndex
CREATE UNIQUE INDEX "EmailActivationToken_userId_key" ON "EmailActivationToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailActivationToken_token_key" ON "EmailActivationToken"("token");

-- CreateIndex
CREATE INDEX "EmailActivationToken_userId_used_idx" ON "EmailActivationToken"("userId", "used");

-- AddForeignKey
ALTER TABLE "MfaCode" ADD CONSTRAINT "MfaCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailActivationToken" ADD CONSTRAINT "EmailActivationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
