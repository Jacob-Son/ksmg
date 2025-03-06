/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserKeyStore` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserKeyStore` table. All the data in the column will be lost.
  - Made the column `userKeyStoreId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_userKeyStoreId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `userKeyStoreId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `UserKeyStore` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userKeyStoreId_fkey` FOREIGN KEY (`userKeyStoreId`) REFERENCES `UserKeyStore`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
