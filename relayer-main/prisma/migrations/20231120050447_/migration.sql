/*
  Warnings:

  - Added the required column `lastLoginAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `lastLoginAt` DATETIME(3) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TxRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('PENDING', 'SUCCESS', 'FAIL') NOT NULL DEFAULT 'PENDING',
    `requestUserId` VARCHAR(191) NOT NULL,
    `serviceType` ENUM('EBOOK') NOT NULL,
    `functionType` ENUM('BUY', 'TRANSFER', 'BURN') NOT NULL,
    `relayerId` INTEGER NOT NULL,
    `txHash` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `blockNumber` INTEGER NOT NULL,
    `effectiveGasPrice` VARCHAR(191) NOT NULL,
    `gasUsed` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TxRecord_txHash_key`(`txHash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relayer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `walletAddress` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Relayer_walletAddress_key`(`walletAddress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
