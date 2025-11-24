/*
  Warnings:

  - You are about to drop the column `closeTime` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `openTime` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "closeTime",
DROP COLUMN "openTime",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "openingHours" JSONB,
ADD COLUMN     "socialLinks" JSONB,
ADD COLUMN     "wifiPassword" TEXT,
ADD COLUMN     "wifiSsid" TEXT;

-- CreateTable
CREATE TABLE "site_settings" (
    "id" SERIAL NOT NULL,
    "singleton" BOOLEAN NOT NULL DEFAULT true,
    "venueName" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "wifiSsid" TEXT,
    "wifiPassword" TEXT,
    "openingHours" JSONB,
    "socialLinks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_singleton_key" ON "site_settings"("singleton");
