/*
  Warnings:

  - You are about to drop the column `cipherC` on the `UserKeyStore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserKeyStore` DROP COLUMN `cipherC`,
    ADD COLUMN `shareC` VARCHAR(191) NULL;
