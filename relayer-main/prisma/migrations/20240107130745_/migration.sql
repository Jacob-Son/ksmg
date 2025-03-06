-- AlterTable
ALTER TABLE `AdminTxRecord` MODIFY `fromAddress` VARCHAR(191) NULL,
    MODIFY `toAddress` VARCHAR(191) NULL,
    MODIFY `tokenId` INTEGER NULL;
