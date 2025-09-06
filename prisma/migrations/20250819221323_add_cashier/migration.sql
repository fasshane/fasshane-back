-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'CASHIER';

-- DropForeignKey
ALTER TABLE "CustomerOrder" DROP CONSTRAINT "CustomerOrder_customerId_fkey";

-- AlterTable
ALTER TABLE "CustomerOrder" ADD COLUMN     "cashierId" TEXT,
ALTER COLUMN "customerId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Cashier" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "register" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cashier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cashier_userId_key" ON "Cashier"("userId");

-- AddForeignKey
ALTER TABLE "Cashier" ADD CONSTRAINT "Cashier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrder" ADD CONSTRAINT "CustomerOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrder" ADD CONSTRAINT "CustomerOrder_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
