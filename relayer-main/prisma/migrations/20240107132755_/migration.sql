/*
  Warnings:

  - You are about to alter the column `orderType` on the `UserTxRecord` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `Int`.

*/
-- AlterTable
ALTER TABLE `UserTxRecord` MODIFY `orderType` INTEGER NOT NULL;
