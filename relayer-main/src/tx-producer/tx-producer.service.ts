import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { UsersService } from 'src/users/users.service';
// import { PopulateBuyService } from './producer/populate-tx/ebook/buy/populate.buy.service';
import { PopulateMintService } from './producer/populate-tx/ebook/mint/populate.mint.service';
import { PopulateTransferService } from './producer/populate-tx/ebook/transfer/populate.transfer.service';
import { PopulateBurnService } from './producer/populate-tx/ebook/burn/populate.burn.service';
// import { PopulateRoyaltyService } from './producer/populate-tx/ebook/royalty/populate.royalty.service';
import { SignTxService } from './producer/sign-tx/sign-tx.service';
import { SendTxService } from './producer/send-tx/send-tx.service';
import { AdminTxRecordsService } from 'src/tx-records/admin.tx-records.service';
import { UserTxRecordsService } from 'src/tx-records/user.tx-records.service';
import { PopulatedTx } from './producer/interfaces/populatedTx.interface';
import { SignedTx } from './producer/interfaces/signedTx.interface';
import { ServiceType, FunctionType } from '@prisma/client';
import {
  BurnNftDto,
  BuyNftDto,
  MintNftDto,
  // SetPlatformRoyaltyRatioDto,
  TransferNftDto,
} from './producer/dto/ebook/tx-producer.dto';

// TODO: check if it is secure to use prisma enum type in the backend service code
@Injectable()
export class TxProducerService {
  private readonly buySignMessage: string = 'E-Book NFT tx request: buy';
  private readonly mintSignMessage: string = 'E-Book NFT tx request: mint';
  private readonly transferSignMessage: string =
    'E-Book NFT tx request: transfer';
  private readonly burnSignMessage: string = 'E-Book NFT tx request: burn';

  constructor(
    private readonly usersService: UsersService,
    // private readonly populateBuyService: PopulateBuyService,
    private readonly populateMintService: PopulateMintService,
    private readonly populateTransferService: PopulateTransferService,
    private readonly populateBurnService: PopulateBurnService,
    // private readonly populateRoyaltyService: PopulateRoyaltyService,
    private readonly signTxService: SignTxService,
    private readonly sendTxService: SendTxService,
    private readonly adminTxRecordsService: AdminTxRecordsService,
    private readonly userTxRecordsService: UserTxRecordsService,
  ) {}

  private verifySignature(
    signature: string,
    address: string,
    functionType: FunctionType,
  ) {
    let signMessage: string;

    switch (functionType) {
      case FunctionType.BUY:
        signMessage = this.buySignMessage;
        break;
      case FunctionType.MINT:
        signMessage = this.mintSignMessage;
        break;
      case FunctionType.TRANSFER:
        signMessage = this.transferSignMessage;
        break;
      case FunctionType.BURN:
        signMessage = this.burnSignMessage;
        break;
      default:
        throw new Error('Invalid transaction type');
    }

    const recoveredAddress = ethers.verifyMessage(signMessage, signature);
    if (recoveredAddress !== address) {
      throw new Error('Invalid signature');
    }
  }

  async produceTx(
    populatedTx: PopulatedTx,
    serviceType: ServiceType,
    functionType: FunctionType,
    dto?: BuyNftDto, // FIXME: make it more generic
  ): Promise<string> {
    // TODO: check where to throw error
    // sign tx
    const signedTx: SignedTx = await this.signTxService.signTx(populatedTx);

    // derive tx hash
    const txHash = ethers.keccak256(signedTx.data); // TODO: check if this is correct

    switch (serviceType) {
      case ServiceType.EBOOK:
        switch (functionType) {
          case FunctionType.BUY:
            // create tx records

            dto.buyNftInfo.forEach(async (buyNftInfo) => {
              await this.userTxRecordsService.create({
                serviceType: serviceType,
                functionType: functionType,
                buyerAddress: dto.buyerAddress,
                sellerAddress: buyNftInfo.seller,
                tokenId: buyNftInfo.tokenId,
                price: buyNftInfo.price,
                royalty: buyNftInfo.royalty,
                orderType: buyNftInfo.orderType,
                relayerId: 1, // TODO: check if this is determined by the relayer
                txHash: txHash,
                data: Buffer.from(populatedTx.data), // LongBlob type in MySQL
                blockNumber: null, // updated by consumer
              });
            });
            // send tx
            await this.sendTxService.sendSignedTx(signedTx, txHash);
            return txHash;

          default:
            // case FunctionType.MINT ||
            //   FunctionType.TRANSFER ||
            //   FunctionType.BURN ||
            //   FunctionType.SET_ROYALTY_RATIO:
            // create tx record
            this.adminTxRecordsService.create({
              serviceType: serviceType,
              functionType: functionType,
              relayerId: 1, // TODO: check if this is determined by the relayer
              txHash: txHash,
              data: Buffer.from(populatedTx.data), // LongBlob type in MySQL
              blockNumber: null, // updated by consumer
            });

            // send tx
            await this.sendTxService.sendSignedTx(signedTx, txHash);
            return txHash;
        }
    }
  }

  // async buyNft(dto: BuyNftDto): Promise<{ txHash: string }> {
  //   try {
  //     const chkpt1 = Date.now();

  //     const chkpt2 = Date.now();
  //     // verify signature
  //     // FIXME: TODO: 검증 로직 추가
  //     // this.verifySignature(dto.signature, walletAddress, FunctionType.BUY);
  //     const chkpt3 = Date.now();

  //     // populate tx
  //     const populatedTx: PopulatedTx =
  //       await this.populateBuyService.populateBuyTx(dto);
  //     const chkpt4 = Date.now();

  //     // produce tx: sign, record and send
  //     const txHash = await this.produceTx(
  //       populatedTx,
  //       ServiceType.EBOOK,
  //       FunctionType.BUY,
  //       dto,
  //     );
  //     const chkpt5 = Date.now();

  //     console.log('============ Profiling API call stack ============');
  //     console.log('>>> getWalletAddressByUid: ', chkpt2 - chkpt1, 'ms');
  //     console.log('>>> verifySignature:', chkpt3 - chkpt2, 'ms');
  //     console.log('>>> populateBuyTx:', chkpt4 - chkpt3, 'ms');
  //     console.log('>>> produceTx:', chkpt5 - chkpt4, 'ms');
  //     console.log('\n\n');

  //     return { txHash };
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  async mintNft(dto: MintNftDto): Promise<{ txHash: string }> {
    try {
      // verify signature
      // FIXME: TODO: 검증 로직 추가
      // this.verifySignature(dto.signature, walletAddress, FunctionType.TRANSFER);

      // populate tx
      const populatedTx: PopulatedTx =
        await this.populateMintService.populateMintTx(dto);

      // produce tx: sign, record and send
      const txHash = await this.produceTx(
        populatedTx,
        ServiceType.EBOOK,
        FunctionType.MINT,
      );

      return { txHash };
    } catch (e) {
      throw new Error(e);
    }
  }

  async transferNft(dto: TransferNftDto): Promise<{ txHash: string }> {
    try {
      // verify signature
      // FIXME: TODO: 검증 로직 추가
      // this.verifySignature(dto.signature, walletAddress, FunctionType.TRANSFER);

      // populate tx
      const populatedTx: PopulatedTx =
        await this.populateTransferService.populateTransferTx(dto);

      // produce tx: sign, record and send
      const txHash = await this.produceTx(
        populatedTx,
        ServiceType.EBOOK,
        FunctionType.TRANSFER,
      );

      return { txHash };
    } catch (e) {
      throw new Error(e);
    }
  }

  async burnNft(dto: BurnNftDto): Promise<{ txHash: string }> {
    try {
      // verify signature
      // FIXME: TODO: 검증 로직 추가
      // this.verifySignature(dto.signature, walletAddress, FunctionType.BURN);

      // populate tx
      const populatedTx: PopulatedTx =
        await this.populateBurnService.populateBurnTx(dto);

      // produce tx: sign, record and send
      const txHash = await this.produceTx(
        populatedTx,
        ServiceType.EBOOK,
        FunctionType.BURN,
      );

      return { txHash };
    } catch (e) {
      throw new Error(e);
    }
  }

  // FIXME: any => AdminTxRecord
  // async setPlatformRoyaltyRatio(
  //   dto: SetPlatformRoyaltyRatioDto,
  // ): Promise<{ txHash: string }> {
  //   try {
  //     // populate tx
  //     const populatedTx: PopulatedTx =
  //       await this.populateRoyaltyService.populateRoyaltyTx(dto);

  //     // produce tx: sign, record and send
  //     const txHash = await this.produceTx(
  //       populatedTx,
  //       ServiceType.EBOOK,
  //       FunctionType.SET_ROYALTY_RATIO,
  //     );

  //     return { txHash };
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}
