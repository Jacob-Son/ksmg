-- CreateTable
CREATE TABLE `Book` (
    `bookId` INTEGER NOT NULL AUTO_INCREMENT,
    `maxPageNumber` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fullAudioPath` VARCHAR(191) NULL,

    PRIMARY KEY (`bookId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `pageId` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `pageNumber` INTEGER NOT NULL,
    `imagePath` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Page_bookId_pageNumber_key`(`bookId`, `pageNumber`),
    PRIMARY KEY (`pageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `noteId` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `userAddress` VARCHAR(191) NOT NULL,
    `pageNumber` INTEGER NOT NULL,
    `notePositionX` DOUBLE NOT NULL,
    `notePositionY` DOUBLE NOT NULL,
    `noteContent` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`noteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auction` (
    `auctionId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NOT NULL DEFAULT '',
    `startPrice` INTEGER NOT NULL,
    `estimatedPrice` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endTime` DATETIME(3) NOT NULL,
    `originEndTime` DATETIME(3) NOT NULL,
    `detailImagePath` VARCHAR(191) NOT NULL DEFAULT '',
    `totalViewCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`auctionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuctionLike` (
    `auctionLikeId` INTEGER NOT NULL AUTO_INCREMENT,
    `auctionId` INTEGER NOT NULL,
    `userAddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AuctionLike_auctionId_userAddress_key`(`auctionId`, `userAddress`),
    PRIMARY KEY (`auctionLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuctionImage` (
    `auctionImageId` INTEGER NOT NULL AUTO_INCREMENT,
    `auctionId` INTEGER NOT NULL,
    `imagePath` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuctionImage_auctionId_fkey`(`auctionId`),
    PRIMARY KEY (`auctionImageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bid` (
    `bidId` INTEGER NOT NULL AUTO_INCREMENT,
    `auctionId` INTEGER NOT NULL,
    `userAddress` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Bid_auctionId_userAddress_price_key`(`auctionId`, `userAddress`, `price`),
    PRIMARY KEY (`bidId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UpperBid` (
    `upperBidId` INTEGER NOT NULL AUTO_INCREMENT,
    `auctionId` INTEGER NOT NULL,
    `userAddress` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UpperBid_auctionId_userAddress_key`(`auctionId`, `userAddress`),
    PRIMARY KEY (`upperBidId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `userAddress` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `phoneNumber` VARCHAR(191) NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `loginType` ENUM('KAKAO', 'GOOGLE', 'NAVER') NOT NULL,
    `userProfileUrl` VARCHAR(191) NULL DEFAULT '',
    `role` ENUM('ADMIN', 'CREATOR', 'USER') NOT NULL DEFAULT 'USER',
    `accountNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `bankName` VARCHAR(191) NOT NULL DEFAULT '',
    `creatorName` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `accountOwner` VARCHAR(191) NOT NULL DEFAULT '',
    `partnerId` VARCHAR(191) NULL DEFAULT '',
    `isMasterAdmin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_userAddress_key`(`userAddress`),
    UNIQUE INDEX `User_email_loginType_key`(`email`, `loginType`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShippingInfo` (
    `shippingId` INTEGER NOT NULL AUTO_INCREMENT,
    `userAddress` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `postCode` VARCHAR(191) NOT NULL,
    `mainAddress` VARCHAR(191) NOT NULL,
    `detailAddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ShippingInfo_userAddress_key`(`userAddress`),
    PRIMARY KEY (`shippingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NftCreateUnit` (
    `nftCreateUnitId` INTEGER NOT NULL AUTO_INCREMENT,
    `creatorAddress` VARCHAR(191) NOT NULL,
    `imagePath` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `theme` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `creatorFee` INTEGER NOT NULL DEFAULT 0,
    `isHidden` BOOLEAN NOT NULL DEFAULT false,
    `preAudioPath` VARCHAR(191) NULL,
    `uniqueId` VARCHAR(191) NULL,

    UNIQUE INDEX `NftCreateUnit_uniqueId_key`(`uniqueId`),
    PRIMARY KEY (`nftCreateUnitId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nft` (
    `nftId` INTEGER NOT NULL AUTO_INCREMENT,
    `creatorAddress` VARCHAR(191) NOT NULL,
    `ownerAddress` VARCHAR(191) NOT NULL,
    `collectionAddress` VARCHAR(191) NOT NULL,
    `tokenId` VARCHAR(191) NOT NULL,
    `numbering` INTEGER NOT NULL DEFAULT 0,
    `category` VARCHAR(191) NOT NULL,
    `theme` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NOT NULL DEFAULT '',
    `totalViewCount` INTEGER NOT NULL DEFAULT 0,
    `royalty` INTEGER NOT NULL DEFAULT 0,
    `type` ENUM('LAZY', 'NORMAL') NOT NULL DEFAULT 'LAZY',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nftImagePath` VARCHAR(191) NOT NULL,
    `nftDetailImagePath` VARCHAR(191) NULL,
    `detailDescription` VARCHAR(1000) NULL,
    `bookId` INTEGER NOT NULL,
    `nftCreateUnitId` INTEGER NOT NULL,

    INDEX `Nft_bookId_fkey`(`bookId`),
    UNIQUE INDEX `Nft_collectionAddress_tokenId_key`(`collectionAddress`, `tokenId`),
    UNIQUE INDEX `Nft_nftCreateUnitId_numbering_key`(`nftCreateUnitId`, `numbering`),
    PRIMARY KEY (`nftId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NftSale` (
    `nftSaleId` INTEGER NOT NULL AUTO_INCREMENT,
    `sellerAddress` VARCHAR(191) NOT NULL,
    `buyerAddress` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `status` ENUM('ON_SALE', 'TRADING', 'SOLD_OUT', 'CONFIRM') NOT NULL DEFAULT 'ON_SALE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `soldAt` DATETIME(3) NULL,
    `confirmAt` DATETIME(3) NULL,
    `nftId` INTEGER NOT NULL,
    `orderId` INTEGER NULL,
    `cartId` INTEGER NULL,
    `platformFee` INTEGER NOT NULL DEFAULT 0,
    `creatorFee` INTEGER NOT NULL DEFAULT 0,
    `txHash` VARCHAR(191) NULL,
    `buyingDeliveryId` INTEGER NULL,

    INDEX `NftSale_cartId_fkey`(`cartId`),
    INDEX `NftSale_nftId_fkey`(`nftId`),
    INDEX `NftSale_orderId_fkey`(`orderId`),
    PRIMARY KEY (`nftSaleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefundedNftSale` (
    `refundedNftSaleId` INTEGER NOT NULL AUTO_INCREMENT,
    `nftSaleId` INTEGER NOT NULL,
    `sellerAddress` VARCHAR(191) NOT NULL,
    `buyerAddress` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `soldAt` DATETIME(3) NULL,
    `nftId` INTEGER NOT NULL,
    `orderId` INTEGER NULL,
    `platformFee` INTEGER NOT NULL DEFAULT 0,
    `creatorFee` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`refundedNftSaleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settle` (
    `settleId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userAddress` VARCHAR(191) NOT NULL,
    `status` ENUM('READY', 'REQUEST', 'SETTLED', 'REJECT') NOT NULL DEFAULT 'READY',
    `settleNftSaleId` INTEGER NOT NULL,
    `type` ENUM('SELLER', 'CREATOR') NOT NULL,

    INDEX `Settle_userAddress_fkey`(`userAddress`),
    UNIQUE INDEX `Settle_settleNftSaleId_type_key`(`settleNftSaleId`, `type`),
    PRIMARY KEY (`settleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `cartId` INTEGER NOT NULL AUTO_INCREMENT,
    `userAddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Cart_userAddress_key`(`userAddress`),
    PRIMARY KEY (`cartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItem` (
    `cartItemId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cartId` INTEGER NOT NULL,
    `nftSaleId` INTEGER NOT NULL,

    UNIQUE INDEX `CartItem_cartId_nftSaleId_key`(`cartId`, `nftSaleId`),
    PRIMARY KEY (`cartItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikeNft` (
    `likeNftId` INTEGER NOT NULL AUTO_INCREMENT,
    `userAddress` VARCHAR(191) NOT NULL,
    `collectionAddress` VARCHAR(191) NOT NULL,
    `tokenId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LikeNft_collectionAddress_tokenId_fkey`(`collectionAddress`, `tokenId`),
    UNIQUE INDEX `LikeNft_userAddress_tokenId_collectionAddress_key`(`userAddress`, `tokenId`, `collectionAddress`),
    PRIMARY KEY (`likeNftId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NftAttribute` (
    `nftAttributeId` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `NftCreateUnitId` INTEGER NOT NULL,

    UNIQUE INDEX `NftAttribute_NftCreateUnitId_key_value_key`(`NftCreateUnitId`, `key`, `value`),
    PRIMARY KEY (`nftAttributeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banner` (
    `bannerId` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(191) NOT NULL,
    `mobileImagePath` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`bannerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `impUid` VARCHAR(191) NULL,
    `merchantUid` VARCHAR(191) NOT NULL,
    `orderName` VARCHAR(191) NOT NULL,
    `paidAmount` INTEGER NOT NULL,
    `userAddress` VARCHAR(191) NOT NULL,
    `status` ENUM('READY', 'PAID', 'CANCEL') NOT NULL DEFAULT 'READY',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Order_impUid_key`(`impUid`),
    UNIQUE INDEX `Order_merchantUid_key`(`merchantUid`),
    INDEX `Order_userAddress_fkey`(`userAddress`),
    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeletedOrder` (
    `deletedOrderId` INTEGER NOT NULL AUTO_INCREMENT,
    `impUid` VARCHAR(191) NULL,
    `merchantUid` VARCHAR(191) NOT NULL,
    `orderName` VARCHAR(191) NOT NULL,
    `paidAmount` INTEGER NOT NULL,
    `userAddress` VARCHAR(191) NOT NULL,
    `status` ENUM('READY', 'PAID', 'CANCEL') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nftSales` VARCHAR(2000) NOT NULL,

    UNIQUE INDEX `DeletedOrder_impUid_key`(`impUid`),
    UNIQUE INDEX `DeletedOrder_merchantUid_key`(`merchantUid`),
    PRIMARY KEY (`deletedOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recommend` (
    `recommendId` INTEGER NOT NULL AUTO_INCREMENT,
    `author` VARCHAR(191) NOT NULL,
    `profileImagePath` VARCHAR(191) NOT NULL,
    `intro` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `backgroundColor` VARCHAR(191) NOT NULL,
    `nftId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Recommend_nftId_fkey`(`nftId`),
    PRIMARY KEY (`recommendId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `eventId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NOT NULL DEFAULT '',
    `imagePath` VARCHAR(191) NOT NULL,
    `detailImagePath` VARCHAR(191) NULL DEFAULT '',
    `startDay` DATETIME(3) NOT NULL,
    `endDay` DATETIME(3) NOT NULL,
    `externalUrl` VARCHAR(191) NULL,
    `eventType` ENUM('EVENT', 'SALE') NOT NULL DEFAULT 'EVENT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rank` (
    `rankId` INTEGER NOT NULL AUTO_INCREMENT,
    `hotRank` VARCHAR(191) NULL,
    `bestRank` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`rankId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theme` (
    `themeId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `like` INTEGER NOT NULL DEFAULT 0,
    `view` INTEGER NOT NULL DEFAULT 0,
    `sale` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Theme_name_key`(`name`),
    PRIMARY KEY (`themeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Config` (
    `configId` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Config_key_key`(`key`),
    PRIMARY KEY (`configId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BurnedNft` (
    `nftId` INTEGER NOT NULL AUTO_INCREMENT,
    `creatorAddress` VARCHAR(191) NOT NULL,
    `ownerAddress` VARCHAR(191) NOT NULL,
    `collectionAddress` VARCHAR(191) NOT NULL,
    `tokenId` VARCHAR(191) NOT NULL,
    `numbering` INTEGER NOT NULL DEFAULT 0,
    `category` VARCHAR(191) NOT NULL,
    `theme` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NOT NULL DEFAULT '',
    `totalViewCount` INTEGER NOT NULL DEFAULT 0,
    `royalty` INTEGER NOT NULL DEFAULT 0,
    `type` ENUM('LAZY', 'NORMAL') NOT NULL DEFAULT 'LAZY',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nftImagePath` VARCHAR(191) NOT NULL,
    `nftDetailImagePath` VARCHAR(191) NULL,
    `detailDescription` VARCHAR(1000) NULL,
    `bookId` INTEGER NOT NULL,
    `nftCreateUnitId` INTEGER NOT NULL,
    `combineLogId` INTEGER NULL,

    UNIQUE INDEX `BurnedNft_name_key`(`name`),
    INDEX `BurnedNft_bookId_fkey`(`bookId`),
    INDEX `BurnedNft_combineLogId_fkey`(`combineLogId`),
    INDEX `BurnedNft_nftCreateUnitId_fkey`(`nftCreateUnitId`),
    PRIMARY KEY (`nftId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CombineLog` (
    `combineLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userAddress` VARCHAR(191) NOT NULL,

    INDEX `CombineLog_userAddress_fkey`(`userAddress`),
    PRIMARY KEY (`combineLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CombineMint` (
    `combineMintId` INTEGER NOT NULL AUTO_INCREMENT,
    `userAddress` VARCHAR(191) NOT NULL,
    `combineLogId` INTEGER NOT NULL,
    `mintedNftId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CombineMint_combineLogId_key`(`combineLogId`),
    UNIQUE INDEX `CombineMint_mintedNftId_key`(`mintedNftId`),
    PRIMARY KEY (`combineMintId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CombineDelivery` (
    `combineDeliveryId` INTEGER NOT NULL AUTO_INCREMENT,
    `userAddress` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `postCode` VARCHAR(191) NOT NULL,
    `mainAddress` VARCHAR(191) NOT NULL,
    `detailAddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('READY', 'CONFIRM', 'DELIVERED') NOT NULL DEFAULT 'READY',
    `combineLogId` INTEGER NOT NULL,

    UNIQUE INDEX `CombineDelivery_combineLogId_key`(`combineLogId`),
    INDEX `CombineDelivery_userAddress_fkey`(`userAddress`),
    PRIMARY KEY (`combineDeliveryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BuyingDelivery` (
    `buyingDeliveryId` INTEGER NOT NULL,
    `userAddress` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `postCode` VARCHAR(191) NOT NULL,
    `mainAddress` VARCHAR(191) NOT NULL,
    `detailAddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('READY', 'CONFIRM', 'DELIVERED') NOT NULL DEFAULT 'READY',
    `type` ENUM('COMBINE', 'NOTE') NOT NULL,
    `nftSaleId` INTEGER NOT NULL,

    UNIQUE INDEX `BuyingDelivery_buyingDeliveryId_key`(`buyingDeliveryId`),
    UNIQUE INDEX `BuyingDelivery_nftSaleId_key`(`nftSaleId`),
    PRIMARY KEY (`buyingDeliveryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notice` (
    `noticeId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`noticeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faq` (
    `faqId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`faqId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HttpLog` (
    `httpLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `method` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `statusCode` INTEGER NOT NULL,
    `userAgent` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `body` VARCHAR(1000) NOT NULL,
    `query` VARCHAR(1000) NOT NULL,
    `userAddress` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`httpLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `logId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `data` VARCHAR(2000) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`logId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentLog` (
    `paymentLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `impUid` VARCHAR(191) NOT NULL,
    `merchantUid` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`paymentLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`bookId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuctionLike` ADD CONSTRAINT `AuctionLike_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `Auction`(`auctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuctionImage` ADD CONSTRAINT `AuctionImage_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `Auction`(`auctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `Auction`(`auctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UpperBid` ADD CONSTRAINT `UpperBid_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `Auction`(`auctionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingInfo` ADD CONSTRAINT `ShippingInfo_userAddress_fkey` FOREIGN KEY (`userAddress`) REFERENCES `User`(`userAddress`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nft` ADD CONSTRAINT `Nft_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`bookId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nft` ADD CONSTRAINT `Nft_nftCreateUnitId_fkey` FOREIGN KEY (`nftCreateUnitId`) REFERENCES `NftCreateUnit`(`nftCreateUnitId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NftSale` ADD CONSTRAINT `NftSale_nftId_fkey` FOREIGN KEY (`nftId`) REFERENCES `Nft`(`nftId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NftSale` ADD CONSTRAINT `NftSale_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Settle` ADD CONSTRAINT `Settle_settleNftSaleId_fkey` FOREIGN KEY (`settleNftSaleId`) REFERENCES `NftSale`(`nftSaleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Settle` ADD CONSTRAINT `Settle_userAddress_fkey` FOREIGN KEY (`userAddress`) REFERENCES `User`(`userAddress`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userAddress_fkey` FOREIGN KEY (`userAddress`) REFERENCES `User`(`userAddress`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`cartId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_nftSaleId_fkey` FOREIGN KEY (`nftSaleId`) REFERENCES `NftSale`(`nftSaleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeNft` ADD CONSTRAINT `LikeNft_collectionAddress_tokenId_fkey` FOREIGN KEY (`collectionAddress`, `tokenId`) REFERENCES `Nft`(`collectionAddress`, `tokenId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeNft` ADD CONSTRAINT `LikeNft_userAddress_fkey` FOREIGN KEY (`userAddress`) REFERENCES `User`(`userAddress`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NftAttribute` ADD CONSTRAINT `NftAttribute_NftCreateUnitId_fkey` FOREIGN KEY (`NftCreateUnitId`) REFERENCES `NftCreateUnit`(`nftCreateUnitId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userAddress_fkey` FOREIGN KEY (`userAddress`) REFERENCES `User`(`userAddress`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recommend` ADD CONSTRAINT `Recommend_nftId_fkey` FOREIGN KEY (`nftId`) REFERENCES `Nft`(`nftId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BurnedNft` ADD CONSTRAINT `BurnedNft_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`bookId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BurnedNft` ADD CONSTRAINT `BurnedNft_combineLogId_fkey` FOREIGN KEY (`combineLogId`) REFERENCES `CombineLog`(`combineLogId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BurnedNft` ADD CONSTRAINT `BurnedNft_nftCreateUnitId_fkey` FOREIGN KEY (`nftCreateUnitId`) REFERENCES `NftCreateUnit`(`nftCreateUnitId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CombineLog` ADD CONSTRAINT `CombineLog_userAddress_fkey` FOREIGN KEY (`userAddress`) REFERENCES `User`(`userAddress`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CombineMint` ADD CONSTRAINT `CombineMint_combineLogId_fkey` FOREIGN KEY (`combineLogId`) REFERENCES `CombineLog`(`combineLogId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CombineMint` ADD CONSTRAINT `CombineMint_mintedNftId_fkey` FOREIGN KEY (`mintedNftId`) REFERENCES `Nft`(`nftId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CombineDelivery` ADD CONSTRAINT `CombineDelivery_combineLogId_fkey` FOREIGN KEY (`combineLogId`) REFERENCES `CombineLog`(`combineLogId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CombineDelivery` ADD CONSTRAINT `CombineDelivery_userAddress_fkey` FOREIGN KEY (`userAddress`) REFERENCES `User`(`userAddress`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BuyingDelivery` ADD CONSTRAINT `BuyingDelivery_nftSaleId_fkey` FOREIGN KEY (`nftSaleId`) REFERENCES `NftSale`(`nftSaleId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BuyingDelivery` ADD CONSTRAINT `BuyingDelivery_userAddress_fkey` FOREIGN KEY (`userAddress`) REFERENCES `User`(`userAddress`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- ✅ Event 테이블에서 ENUM 수정 (CULTURE 삭제, SALE 추가)