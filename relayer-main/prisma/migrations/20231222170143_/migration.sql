/*
  Warnings:

  - Added the required column `userWalletAddress` to the `TxRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TxRecord` ADD COLUMN `userWalletAddress` VARCHAR(191) NOT NULL;
