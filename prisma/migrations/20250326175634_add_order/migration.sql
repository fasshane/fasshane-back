-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('INITIAL', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED', 'FAILED');

-- DropIndex
DROP INDEX "Product_count_idx";

-- DropIndex
DROP INDEX "Product_type_idx";

-- AlterTable
ALTER TABLE "SupplierProduct" ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "managerId" TEXT,
ADD COLUMN     "orderId" TEXT;

-- CreateTable
CREATE TABLE "SupplierOrder" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "status" "OrderStatus" NOT NULL DEFAULT 'INITIAL',

    CONSTRAINT "SupplierOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SupplierOrder_status_supplierId_idx" ON "SupplierOrder"("status", "supplierId");

-- CreateIndex
CREATE INDEX "Product_type_count_name_idx" ON "Product"("type", "count", "name");

-- AddForeignKey
ALTER TABLE "SupplierOrder" ADD CONSTRAINT "SupplierOrder_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProduct" ADD CONSTRAINT "SupplierProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SupplierOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProduct" ADD CONSTRAINT "SupplierProduct_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProduct" ADD CONSTRAINT "SupplierProduct_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
