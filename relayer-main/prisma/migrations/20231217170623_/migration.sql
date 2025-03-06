/*
  Warnings:

  - You are about to drop the column `shareC` on the `UserKeyStore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserKeyStore` DROP COLUMN `shareC`,
    ADD COLUMN `cipherC` VARCHAR(191) NULL,
    ADD COLUMN `encryptedShareC` VARCHAR(191) NULL,
    ADD COLUMN `iv` VARCHAR(191) NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NULL,
    ADD COLUMN `salt` VARCHAR(191) NULL;
