/*
  Warnings:

  - A unique constraint covering the columns `[userKeyStoreId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `userKeyStoreId` INTEGER NULL;

-- CreateTable
CREATE TABLE `UserKeyStore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pkShare` VARCHAR(191) NULL,
    `shareC` VARCHAR(191) NULL,
    `shareB1` VARCHAR(191) NULL,
    `shareB2` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_userKeyStoreId_key` ON `User`(`userKeyStoreId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userKeyStoreId_fkey` FOREIGN KEY (`userKeyStoreId`) REFERENCES `UserKeyStore`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
