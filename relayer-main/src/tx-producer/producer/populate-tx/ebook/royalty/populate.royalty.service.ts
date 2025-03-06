import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PopulateTxService } from '../../populate-tx.service';
import { PopulatedTx } from 'src/tx-producer/producer/interfaces/populatedTx.interface';
import { SetPlatformRoyaltyRatioDto } from 'src/tx-producer/producer/dto/ebook/tx-producer.dto';
import { ethers } from 'ethers';
import { FunctionType, ServiceType } from '@prisma/client';
import { ebookMarketIface } from 'src/tx-producer/producer/ethers-interfaces/ebook/interfaces';

@Injectable()
export class PopulateRoyaltyService {
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
   * params for `EbookMarket.setPlatformRoyaltyRatio` (smart contract function call)
   * @param _platformRoyaltyRatio: uint256 (0 ~ 100)
   */
  async populateRoyaltyTx(
    dto: SetPlatformRoyaltyRatioDto,
  ): Promise<PopulatedTx> {
    const callData = this.iface.encodeFunctionData('setPlatformRoyaltyRatio', [
      dto.platformRoyaltyRatio,
    ]);

    const callValue = 0n;

    const populatedTx = await this.populateTxService.populateTx(
      ServiceType.EBOOK,
      FunctionType.SET_ROYALTY_RATIO,
      this.contractAddress,
      this.relayerAddress,
      callValue,
      callData,
    );

    return populatedTx;
  }
}
