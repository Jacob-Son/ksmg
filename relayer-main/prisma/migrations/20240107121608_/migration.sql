/*
  Warnings:

  - Added the required column `orderType` to the `UserTxRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `UserTxRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `royalty` to the `UserTxRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `UserTxRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserTxRecord` ADD COLUMN `orderType` ENUM('LAZY_MINT', 'BUY') NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `royalty` INTEGER NOT NULL,
    ADD COLUMN `tokenId` INTEGER NOT NULL;
