import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PopulateTxService } from '../../populate-tx.service';
import { PopulatedTx } from 'src/tx-producer/producer/interfaces/populatedTx.interface';
import { BuyNftDto } from 'src/tx-producer/producer/dto/ebook/tx-producer.dto';
import { ethers } from 'ethers';
import { FunctionType, ServiceType } from '@prisma/client';
import { ebookMarketIface } from 'src/tx-producer/producer/ethers-interfaces/ebook/interfaces';

@Injectable()
export class PopulateBuyService {
  private readonly iface: ethers.Interface;
  private readonly contractAddress: string;
  private readonly relayerAddress: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly populateTxService: PopulateTxService,
  ) {
    this.iface = ebookMarketIface;
    this.contractAddress = this.configService.get<string>(
      'EBOOK_MARKET_ADDRESS',
    );
    this.relayerAddress = this.configService.get<string>('RELAYER_ADDRESS');
  }

  /**
   * params for `EbookMarket.buy` (smart contract function call)
   * @param buyer: address
   * @param _nftInfo: BuyNFTInfo[]
   * @param totalPrice: uint256
   * @param _validateInfo: ValidateInfo
   */
  async populateBuyTx(dto: BuyNftDto): Promise<PopulatedTx> {
    const callData = this.iface.encodeFunctionData('buy', [
      dto.buyerAddress,
      dto.buyNftInfo,
      dto.totalPrice,
      dto.validateInfo,
    ]);

    const callValue = 0n;

    const _options = {
      mintingAmount: dto.buyNftInfo.length,
    };

    const populatedTx = await this.populateTxService.populateTx(
      ServiceType.EBOOK,
      FunctionType.BUY,
      this.contractAddress,
      this.relayerAddress,
      callValue,
      callData,
      _options,
    );

    return populatedTx;
  }
}
