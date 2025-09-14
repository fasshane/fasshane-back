/*
  Warnings:

  - A unique constraint covering the columns `[orderId,mealId]` on the table `CustomerOrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomerOrderItem_orderId_mealId_key" ON "CustomerOrderItem"("orderId", "mealId");
