-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_userKeyStoreId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `userKeyStoreId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userKeyStoreId_fkey` FOREIGN KEY (`userKeyStoreId`) REFERENCES `UserKeyStore`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
