-- AlterEnum
ALTER TYPE "ProductType" ADD VALUE 'QUANTITY';

-- DropForeignKey
ALTER TABLE "SupplierProducts" DROP CONSTRAINT "SupplierProducts_productId_fkey";

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SupplierProducts" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Need to add name',
ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SupplierProducts" ADD CONSTRAINT "SupplierProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
