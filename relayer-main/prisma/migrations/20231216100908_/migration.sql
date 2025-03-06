/*
  Warnings:

  - Made the column `pkShare` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shareB1` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shareC` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shareB2` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `pkShare` VARCHAR(191) NOT NULL,
    MODIFY `shareB1` VARCHAR(191) NOT NULL,
    MODIFY `shareC` VARCHAR(191) NOT NULL,
    MODIFY `shareB2` VARCHAR(191) NOT NULL;
