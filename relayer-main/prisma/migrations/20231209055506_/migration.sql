/*
  Warnings:

  - You are about to alter the column `effectiveGasPrice` on the `TxRecord` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `gasUsed` on the `TxRecord` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `TxRecord` MODIFY `effectiveGasPrice` INTEGER NULL,
    MODIFY `gasUsed` INTEGER NULL;
