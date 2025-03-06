/*
  Warnings:

  - You are about to drop the column `requestUserId` on the `TxRecord` table. All the data in the column will be lost.
  - You are about to drop the column `userWalletAddress` on the `TxRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `TxRecord` DROP COLUMN `requestUserId`,
    DROP COLUMN `userWalletAddress`;
