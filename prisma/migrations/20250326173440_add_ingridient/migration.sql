/*
  Warnings:

  - You are about to drop the `MealProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('WEIGHT', 'LIQUID');

-- DropForeignKey
ALTER TABLE "MealProduct" DROP CONSTRAINT "MealProduct_mealId_fkey";

-- DropForeignKey
ALTER TABLE "MealProduct" DROP CONSTRAINT "MealProduct_productId_fkey";

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "count" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "type" "ProductType" NOT NULL;

-- AlterTable
ALTER TABLE "SupplierProduct" ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(65,30);

-- DropTable
DROP TABLE "MealProduct";

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL DEFAULT 1,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_mealId_productId_key" ON "Ingredient"("mealId", "productId");

-- CreateIndex
CREATE INDEX "Admin_userId_idx" ON "Admin"("userId");

-- CreateIndex
CREATE INDEX "Customer_userId_idx" ON "Customer"("userId");

-- CreateIndex
CREATE INDEX "Manager_userId_idx" ON "Manager"("userId");

-- CreateIndex
CREATE INDEX "Product_type_idx" ON "Product"("type");

-- CreateIndex
CREATE INDEX "Product_count_idx" ON "Product"("count");

-- CreateIndex
CREATE INDEX "SupplierProduct_productId_supplierId_idx" ON "SupplierProduct"("productId", "supplierId");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
