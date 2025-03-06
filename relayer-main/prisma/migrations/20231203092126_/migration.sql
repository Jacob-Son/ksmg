-- DropIndex
DROP INDEX `User_uid_key` ON `User`;

-- AlterTable
ALTER TABLE `User` ADD PRIMARY KEY (`uid`);
