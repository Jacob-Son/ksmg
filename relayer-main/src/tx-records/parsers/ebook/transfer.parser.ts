// import { ethers } from 'ethers';

// export class EbookTransferParserResult {
//   fromAddress: string;
//   toAddress: string;
//   tokenId: number;
// }

// // TODO: refactoring
// // FIXME: making this @Injectable() with class?
// export function ebookTransferParser(
//   callData: string,
//   callValue: bigint,
//   iface: ethers.Interface,
// ): EbookTransferParserResult {
//   const decodedData = iface.parseTransaction({
//     data: callData,
//     value: callValue,
//   });

//   const args = decodedData.args;
//   const fromAddress: string = args[0];
//   const toAddress: string = args[1];
//   const tokenId: number = Number(args[2]);

//   // TODO: return value 인터페이스 통일
//   return {
//     fromAddress,
//     toAddress,
//     tokenId,
//   };
// }
