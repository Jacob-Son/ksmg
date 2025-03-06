import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { ProviderCache } from '../cache/provider.cache';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
// TODO: consider using `signer.populateTransaction`
// ethers documentation: https://docs.ethers.org/v6/api/providers/#Signer-populateTransaction

@Injectable()
export class ProviderService {
  private readonly provider: ethers.JsonRpcProvider;

  constructor(
    private readonly configService: ConfigService,
    private readonly providerCache: ProviderCache,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('POLYGON_RPC_URL'),
    );
  }

  // get network data from provider for tx fields

  private async getFeeData(
    provider: ethers.JsonRpcProvider,
  ): Promise<ethers.FeeData> {
    const feeData = await provider.getFeeData();
    return feeData;
  }

  private async getLastBaseFeePerGas(
    provider: ethers.JsonRpcProvider,
  ): Promise<bigint> {
    const lastBlock = await provider.getBlock('latest');
    return lastBlock.baseFeePerGas;
  }

  async getTxNetworkFields(relayerAddress: string) {
    const chkpt1 = Date.now();
    // const nonce = await this.providerCache.getRelayerTxCount(relayerAddress);

    const nextNonce = await this.provider.getTransactionCount(
      relayerAddress,
      'pending',
    );
    const nonce = nextNonce;
    const chkpt2 = Date.now();

    // const _feeData = await this.getFeeData(provider);
    const _feeData = await this.cacheManager.get<ethers.FeeData>('feeData');
    console.log('>>> _feeData: ', _feeData);
    const chkpt3 = Date.now();
    // const _lastBaseFeePerGas = await this.getLastBaseFeePerGas(provider);
    const _lastBaseFeePerGas =
      await this.cacheManager.get<bigint>('lastBaseFeePerGas');
    console.log('>>> _lastBaseFeePerGas: ', _lastBaseFeePerGas);
    const chkpt4 = Date.now();

    const maxFeePerGas = _feeData.maxFeePerGas * 2n; // temporary // TODO: optimize
    const maxPriorityFeePerGas = _feeData.maxPriorityFeePerGas;
    const gasPrice = _feeData.gasPrice;
    const lastBaseFeePerGas = _lastBaseFeePerGas;
    const maxPriorityFeePerGasWithTips = (maxPriorityFeePerGas * 12n) / 10n; // 20% tip // TODO: optimize
    const gasPriceWithTips =
      ((lastBaseFeePerGas + maxPriorityFeePerGas) * 12n) / 10n; // 20% tip

    console.log('============ Provider Profiling ============');
    console.log('>>> getTransactionCount: ', chkpt2 - chkpt1, 'ms');
    console.log('>>> getFeeData: ', chkpt3 - chkpt2, 'ms');
    console.log('>>> getLastBaseFeePerGas: ', chkpt4 - chkpt3, 'ms');

    return {
      nonce: nonce,
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxPriorityFeePerGas,
      gasPrice: gasPrice,
      lastBaseFeePerGas: lastBaseFeePerGas,
      maxPriorityFeePerGasWithTips: maxPriorityFeePerGasWithTips,
      gasPriceWithTips: gasPriceWithTips,
    };
  }
}
