/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `UserKeyStore` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `UserKeyStore` ADD COLUMN `address` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserKeyStore_address_key` ON `UserKeyStore`(`address`);
