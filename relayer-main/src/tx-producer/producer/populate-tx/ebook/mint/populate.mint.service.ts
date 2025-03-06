import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PopulateTxService } from '../../populate-tx.service';
import { PopulatedTx } from 'src/tx-producer/producer/interfaces/populatedTx.interface';
import { MintNftDto } from 'src/tx-producer/producer/dto/ebook/tx-producer.dto';
import { ethers } from 'ethers';
import { FunctionType, ServiceType } from '@prisma/client';
import { ebookNftCollectionIface } from 'src/tx-producer/producer/ethers-interfaces/ebook/interfaces';

@Injectable()
export class PopulateMintService {
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
   * params for `EbookNFTCollection.mint` (smart contract function call)
   * @param _creator: address
   * @param _recipient: address
   * @param _tokenId: uint256
   * @param _royalty: uint256
   */
  async populateMintTx(dto: MintNftDto): Promise<PopulatedTx> {
    const callData = this.iface.encodeFunctionData('mint', [
      dto.creatorAddress,
      dto.recipientAddress,
      dto.tokenId,
      dto.creatorRoyaltyRatio,
    ]);

    const callValue = 0n;

    const populatedTx = await this.populateTxService.populateTx(
      ServiceType.EBOOK,
      FunctionType.MINT,
      this.contractAddress,
      this.relayerAddress,
      callValue,
      callData,
    );

    return populatedTx;
  }
}
