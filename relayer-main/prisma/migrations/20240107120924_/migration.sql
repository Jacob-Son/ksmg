/*
  Warnings:

  - You are about to drop the `TxRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `TxRecord`;

-- CreateTable
CREATE TABLE `AdminTxRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('PENDING', 'SUCCESS', 'FAIL') NOT NULL DEFAULT 'PENDING',
    `serviceType` ENUM('EBOOK') NOT NULL,
    `functionType` ENUM('BUY', 'MINT', 'TRANSFER', 'BURN', 'SET_ROYALTY_RATIO') NOT NULL,
    `fromAddress` VARCHAR(191) NOT NULL,
    `toAddress` VARCHAR(191) NOT NULL,
    `tokenId` INTEGER NOT NULL,
    `relayerId` INTEGER NOT NULL,
    `txHash` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,
    `blockNumber` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdminTxRecord_txHash_key`(`txHash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTxRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('PENDING', 'SUCCESS', 'FAIL') NOT NULL DEFAULT 'PENDING',
    `serviceType` ENUM('EBOOK') NOT NULL,
    `functionType` ENUM('BUY', 'MINT', 'TRANSFER', 'BURN', 'SET_ROYALTY_RATIO') NOT NULL,
    `buyerAddress` VARCHAR(191) NOT NULL,
    `sellerAddress` VARCHAR(191) NOT NULL,
    `relayerId` INTEGER NOT NULL,
    `txHash` VARCHAR(191) NOT NULL,
    `data` LONGBLOB NOT NULL,
    `blockNumber` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
