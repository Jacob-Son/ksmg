import { ethers } from 'ethers';
import { BuyNFTInfo } from 'src/tx-producer/producer/dto/ebook/tx-producer.dto';

export class EbookBuyParserResult {
  buyerAddress: string;
  buyNftInfoArray: BuyNFTInfo[];
  totalPrice: number;
  numberOfNfts: number;
}

// TODO: refactoring
// FIXME: making this @Injectable() with class?
export function ebookBuyParser(
  callData: string,
  callValue: bigint,
  iface: ethers.Interface,
): EbookBuyParserResult {
  const decodedData = iface.parseTransaction({
    data: callData,
    value: callValue,
  });

  const args = decodedData.args;
  const buyerAddress: string = args[0];
  const buyNftInfoArrayResult = args[1];
  const buyNftInfoArray: BuyNFTInfo[] = [];
  // TODO: FIXME: ethers에서 bigint로 받아온 데이터를 response에 포함시키기 위해 Number로 변환 (또는 string으로 변환))
  // Rseult Array => Object로 변환하는 파이프
  buyNftInfoArrayResult.map((buyNftInfoResult) => {
    const buyNftInfo: BuyNFTInfo = {
      orderType: Number(buyNftInfoResult[0]),
      collectionAddress: buyNftInfoResult[1],
      creator: buyNftInfoResult[2],
      seller: buyNftInfoResult[3],
      tokenId: Number(buyNftInfoResult[4]),
      royalty: Number(buyNftInfoResult[5]),
      price: Number(buyNftInfoResult[6]),
    };
    buyNftInfoArray.push(buyNftInfo);
  });

  const totalPrice: number = Number(args[2]);
  const numberOfNfts = buyNftInfoArray.length;

  // TODO: return value 인터페이스 통일
  return {
    buyerAddress,
    buyNftInfoArray,
    totalPrice,
    numberOfNfts,
  };
}
