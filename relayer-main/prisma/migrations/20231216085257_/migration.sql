/*
  Warnings:

  - You are about to drop the column `ShareB2` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `ShareB2`,
    ADD COLUMN `shareB2` VARCHAR(191) NULL;
