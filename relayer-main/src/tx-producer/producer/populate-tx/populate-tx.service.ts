import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { ProviderService } from 'src/tx-producer/provider/provider.service';
import { PopulatedTx } from 'src/tx-producer/producer/interfaces/populatedTx.interface';
import { FunctionType, ServiceType } from '@prisma/client';
import { GasService } from 'src/tx-producer/gas/gas.service';

@Injectable()
export class PopulateTxService {
  private readonly rpcUrl: string;
  private readonly chainId: number;
  private readonly provider: ethers.JsonRpcProvider;

  constructor(
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
    private readonly gasService: GasService,
  ) {
    this.rpcUrl = this.configService.get<string>('POLYGON_RPC_URL');
    this.chainId = this.configService.get<number>('POLYGON_CHAIN_ID');
    this.provider = new ethers.JsonRpcProvider(this.rpcUrl);
  }

  async populateTx(
    serviceType: ServiceType,
    functionType: FunctionType,
    contractAddress: string,
    relayerAddress: string,
    callValue: bigint,
    callData: string,
    options?: any,
  ): Promise<PopulatedTx> {
    // FIXME: optimization required for fetching network-related fields

    const chkpt1 = Date.now();
    // fetch from the cache
    const networkTxFields =
      await this.providerService.getTxNetworkFields(relayerAddress);

    const chkpt2 = Date.now();

    const minimalTx = {
      to: contractAddress,
      from: relayerAddress,
      value: callValue,
      data: callData,
    };

    try {
      const chkpt3 = Date.now();

      const estimatedGas = await this.gasService.getEstimatedGas(
        serviceType,
        functionType,
        options,
      );
      // const estimatedGas = await this.provider.estimateGas(minimalTx); // TODO: separate this logic

      console.log('>>>>>>>>> estimatedGas: ', estimatedGas);
      const chkpt4 = Date.now();

      const populatedTx: PopulatedTx = {
        ...minimalTx,
        type: 2,
        maxFeePerGas: networkTxFields.maxFeePerGas,
        maxPriorityFeePerGas: networkTxFields.maxPriorityFeePerGasWithTips,
        gasPrice: networkTxFields.gasPriceWithTips,
        nonce: networkTxFields.nonce,
        gasLimit: (estimatedGas * 11n) / 10n, // + 10% gasLimit
        chainId: BigInt(this.chainId),
      };
      console.log('>>>>>> getTxFieldsFromProvider: ', chkpt2 - chkpt1, 'ms');
      console.log('>>>>>> estimateGas: ', chkpt4 - chkpt3, 'ms');

      // console.log('>>> populated tx:', populatedTx);

      return populatedTx;
    } catch (e) {
      throw new Error(e);
    }
  }
}
