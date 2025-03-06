// import { ethers } from 'ethers';

// export class EbookBurnParserResult {
//   tokenId: number;
// }

// // TODO: refactoring
// // FIXME: making this @Injectable() with class?
// export function ebookBurnParser(
//   callData: string,
//   callValue: bigint,
//   iface: ethers.Interface,
// ): EbookBurnParserResult {
//   const decodedData = iface.parseTransaction({
//     data: callData,
//     value: callValue,
//   });
//   const args = decodedData.args;
//   const tokenId: number = Number(args[0]);

//   // TODO: return value 인터페이스 통일
//   return {
//     tokenId,
//   };
// }
