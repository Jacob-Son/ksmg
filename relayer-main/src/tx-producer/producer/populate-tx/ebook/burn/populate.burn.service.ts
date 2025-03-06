import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { PopulateTxService } from '../../populate-tx.service';
import { PopulatedTx } from 'src/tx-producer/producer/interfaces/populatedTx.interface';
import { BurnNftDto } from 'src/tx-producer/producer/dto/ebook/tx-producer.dto';
import { ServiceType, FunctionType } from '@prisma/client';
import { ebookNftCollectionIface } from 'src/tx-producer/producer/ethers-interfaces/ebook/interfaces';

@Injectable()
export class PopulateBurnService {
  private readonly iface: ethers.Interface;
  private readonly contractAddress: string;
  private readonly relayerAddress: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly populateTxService: PopulateTxService,
  ) {
    this.iface = ebookNftCollectionIface;
    this.contractAddress = this.configService.get<string>(
      'EBOOK_NFT_COLLECTION_ADDRESS',
    );
    this.relayerAddress = this.configService.get<string>('RELAYER_ADDRESS');
  }

  /**
   * params for `EbookMarket.burn` (smart contract function call)
   * @param id: uint256
   */
  async populateBurnTx(dto: BurnNftDto): Promise<PopulatedTx> {
    // const callData = this.iface.encodeFunctionData('burn', [dto.tokenId]);
    const callData = this.iface.encodeFunctionData('burn', [dto.tokenId]);

    const callValue = 0n;

    const populatedTx = await this.populateTxService.populateTx(
      ServiceType.EBOOK,
      FunctionType.BURN,
      this.contractAddress,
      this.relayerAddress,
      callValue,
      callData,
    );

    return populatedTx;
  }
}
