/*
  Warnings:

  - You are about to drop the `site_settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "allergens" TEXT[],
ADD COLUMN     "weightMax" DECIMAL(10,2),
ADD COLUMN     "weightMin" DECIMAL(10,2);

-- DropTable
DROP TABLE "site_settings";
