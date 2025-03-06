import { ApiProperty } from '@nestjs/swagger';

// ========================================
// service: Ebook
// function: buy
// ========================================

// interfaces
enum OrderType {
  LAZY_MINT = 0,
  BUY = 1,
}

export interface BuyNFTInfo {
  orderType: number;
  collectionAddress: string; // address
  creator: string; // address
  seller: string; // address
  tokenId: number;
  royalty: number;
  price: number;
}

export interface ValidateInfo {
  relayer: string; // address
  userSignature: string; // bytes
  relayerSignature: string; // bytes
}

// ========================================
// service: Ebook
// function: buy
// ========================================
export class BuyNftDto {
  @ApiProperty({
    example: '0xBe1279bDCE21dF101D4ac9E8C9Fddd010F9110D5',
    description: 'buyer address',
  })
  buyerAddress: string;

  @ApiProperty({
    example:
      '0xc28d7e476bf54d026a702158c1cac996d8b5eb1e782b06dd8e26f0a14b1616a85fa34ffbc05d3a7d67fb281c99d1ed9f39b17cd26e75c4bbabf5250b535ddffa1c',
    description: 'signed message by user',
  })
  signature: string;

  @ApiProperty({
    example: [
      {
        orderType: OrderType.LAZY_MINT,
        collectionAddress: '0xF1EFa9a4d39FF029f719b3DBdeDeC9b7146aDeBe',
        creator: '0x25BA43364BF720d8dFe3c2680CB4C232a29B093C',
        seller: '0x25BA43364BF720d8dFe3c2680CB4C232a29B093C',
        tokenId: 1,
        royalty: 5,
        price: 120000,
      },
      {
        orderType: OrderType.LAZY_MINT,
        collectionAddress: '0xF1EFa9a4d39FF029f719b3DBdeDeC9b7146aDeBe',
        creator: '0x25BA43364BF720d8dFe3c2680CB4C232a29B093C',
        seller: '0x25BA43364BF720d8dFe3c2680CB4C232a29B093C',
        tokenId: 2,
        royalty: 7,
        price: 80000,
      },
    ],
    description: 'Ebook NFT buy function param: `buyNftInfo`',
  })
  buyNftInfo: BuyNFTInfo[];

  @ApiProperty({
    example: 200000,
    description: 'total price of the order',
  })
  totalPrice: number;

  @ApiProperty({
    example: {
      relayer: '0x1beCbcC8eefC20b7bBdc099B87d82E2230e72705',
      userSignature:
        '0x874989646e9033bfa927246240b3437b5211d33017a7a49f21be683a4d1619b055022c2baba733c460a795a1cc96b6d95b7a3da1d89633e6f973b1736bc97ee91b',
      relayerSignature:
        '0x7135267b74b4248a7fe5fabc0a7ec8fdc4e3a680425ab87d3cc0e44bbe949e9817c5a64158d4b4ee7840e2891fe315c16be41530e65f1cd8e56d2f49d93e26e01c',
    },
    description: 'Ebook NFT buy function param: `validateInfo`',
  })
  validateInfo: ValidateInfo;
}

// ========================================
// service: Ebook
// function: mint
// ========================================
export class MintNftDto {
  @ApiProperty({
    example:
      '0x9502858d085b5628070c9995a0e9bcde28cd3e93a23a98d4cd61ebe47769c1b34b7f3d301b6b6a5309825b9d52eed67e0890f25a1ba4e21b03d6e3981459667b1b',
    description: 'signed message by user',
  })
  signature: string;

  @ApiProperty({
    example: '0x6E8cb2cD9abcd416B3FAA582AcA1fFB7830AE65F',
    description: 'NFT creator address',
  })
  creatorAddress: string;

  @ApiProperty({
    example: '0x118f8E29Aa25DD04ee428082EA99080A621d9984',
    description: 'NFT receiver address',
  })
  recipientAddress: string;

  @ApiProperty({
    example: 100,
    description: 'NFT tokenId',
  })
  tokenId: number;

  @ApiProperty({
    example: 15,
    description: 'Platform royalty ratio (0 ~ 100 for 0% ~ 100%)',
  })
  creatorRoyaltyRatio: number;
}

// ========================================
// service: Ebook
// function: transfer
// ========================================
export class TransferNftDto {
  @ApiProperty({
    example:
      '0xba172174e114c9ececa8974163a1fcf813911da18425738c3eb776294f3db601776334a804d1c267bd92b5d25283f9b8a791208d299c5c5d94c86a0c696917b31c',
    description: 'signed message by user',
  })
  signature: string;

  @ApiProperty({
    example: '0x118f8E29Aa25DD04ee428082EA99080A621d9984',
    description: 'NFT receiver address',
  })
  toAddress: string;

  @ApiProperty({
    example: 1,
    description: 'NFT tokenId',
  })
  tokenId: number;
}

// ========================================
// service: Ebook
// function: burn
// ========================================
export class BurnNftDto {
  @ApiProperty({
    example:
      '0x7622cda542b8b1b3440f45c3daed233c73a5cdbc5d5caf9b306d2e49b5999c8f4b181e458a2ef1a54ff337f21a2c6b9f08c05e52ff5fd8338821bc249a5606511b',
    description: 'signed message by user',
  })
  signature: string;

  @ApiProperty({
    example: 1,
    description: 'NFT tokenId',
  })
  tokenId: number;
}

// ========================================
// service: Ebook
// function: setPlatformRoyaltyRatio
// ========================================
export class SetPlatformRoyaltyRatioDto {
  @ApiProperty({
    example: 15,
    description: 'Platform royalty ratio (0 ~ 100 for 0% ~ 100%)',
  })
  platformRoyaltyRatio: number;
}
