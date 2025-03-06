/*
  Warnings:

  - You are about to drop the column `pkShare` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `shareB1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `shareB2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `shareC` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `pkShare`,
    DROP COLUMN `shareB1`,
    DROP COLUMN `shareB2`,
    DROP COLUMN `shareC`;
