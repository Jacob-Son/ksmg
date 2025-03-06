-- AlterTable
ALTER TABLE `Relayer` ADD COLUMN `txCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `TxRecord` MODIFY `blockNumber` INTEGER NULL,
    MODIFY `effectiveGasPrice` VARCHAR(191) NULL,
    MODIFY `gasUsed` VARCHAR(191) NULL;
