import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  ebookMarketIface,
  ebookNftCollectionIface,
} from 'src/tx-producer/producer/ethers-interfaces/ebook/interfaces';
import { ServiceType, FunctionType } from '@prisma/client';
import { ebookBuyParser } from './ebook/buy.parser';

@Injectable()
export class TxParserService {
  private readonly ebookMarketIface: ethers.Interface;
  private readonly ebookNftCollectionIface: ethers.Interface;

  constructor() {
    this.ebookMarketIface = ebookMarketIface;
    this.ebookNftCollectionIface = ebookNftCollectionIface;
  }

  // FIXME: return type / async?
  parseTxData(
    callData: string,
    callValue: bigint,
    serviceType: ServiceType,
    functionType: FunctionType,
  ): any {
    switch (serviceType) {
      case ServiceType.EBOOK:
        switch (functionType) {
          case FunctionType.BUY:
            return ebookBuyParser(callData, callValue, this.ebookMarketIface);

          // case FunctionType.TRANSFER:
          //   return ebookTransferParser(
          //     callData,
          //     callValue,
          //     this.ebookNftCollectionIface,
          //   );

          // case FunctionType.BURN:
          //   return ebookBurnParser(
          //     callData,
          //     callValue,
          //     this.ebookNftCollectionIface,
          //   );

          // case FunctionType.SET_ROYALTY_RATIO:
          //   decodedData = this.ebookNftCollectionIface.parseTransaction({
          //     data: callData,
          //     value: callValue,
          //   });
          //   console.log('decodedData: ', decodedData);
          //   return decodedData;

          default:
            return null;
        }

      default:
        return null;
    }
  }
}
