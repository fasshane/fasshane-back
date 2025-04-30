/*
  Warnings:

  - You are about to drop the `_MealProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MealProducts" DROP CONSTRAINT "_MealProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_MealProducts" DROP CONSTRAINT "_MealProducts_B_fkey";

-- DropTable
DROP TABLE "_MealProducts";

-- CreateTable
CREATE TABLE "MealProduct" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "MealProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MealProduct_mealId_productId_key" ON "MealProduct"("mealId", "productId");

-- AddForeignKey
ALTER TABLE "MealProduct" ADD CONSTRAINT "MealProduct_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealProduct" ADD CONSTRAINT "MealProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
