/*
  Warnings:

  - You are about to drop the column `providerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pkShare` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `providerId`,
    ADD COLUMN `pkShare` VARCHAR(191) NOT NULL,
    ADD COLUMN `walletAddress` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Article`;

-- CreateIndex
CREATE UNIQUE INDEX `User_walletAddress_key` ON `User`(`walletAddress`);
