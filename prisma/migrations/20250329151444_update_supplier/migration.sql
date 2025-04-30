/*
  Warnings:

  - You are about to drop the column `image` on the `Supplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "image",
ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT 'https://img.freepik.com/premium-vector/supplier-icon-vector-image-can-be-used-supply-chain_120816-403225.jpg';
