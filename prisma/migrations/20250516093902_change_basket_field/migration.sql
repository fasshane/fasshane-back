-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_id_fkey";

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
