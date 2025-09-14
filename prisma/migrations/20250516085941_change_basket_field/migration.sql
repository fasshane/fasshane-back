-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_customerId_fkey";

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
