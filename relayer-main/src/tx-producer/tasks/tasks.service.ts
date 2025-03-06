import { Injectable, Inject, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ethers } from 'ethers';

@Injectable()
export class TasksService {
  private readonly rpcUrl: string;
  private readonly chainId: number;
  private readonly provider: ethers.JsonRpcProvider;
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.rpcUrl = this.configService.get<string>('POLYGON_RPC_URL');
    this.chainId = this.configService.get<number>('POLYGON_CHAIN_ID');
    this.provider = new ethers.JsonRpcProvider(this.rpcUrl);
  }

  // TODO: update relayers' nonce
  @Cron(CronExpression.EVERY_10_SECONDS)
  async fetchNetworkFields() {
    this.logger.debug('************** Called every 10 seconds **************');
    // const chkpt1 = Date.now();
    const feeData = await this.getFeeData(this.provider);
    // const chkpt2 = Date.now();
    const lastBaseFeePerGas = await this.getLastBaseFeePerGas(this.provider);
    // const chkpt3 = Date.now();
    this.cacheManager.set('feeData', feeData, 0); // no expiration
    this.cacheManager.set('lastBaseFeePerGas', lastBaseFeePerGas, 0); // no expiration
    // const chkpt4 = Date.now();
    // this.logger.debug('feeData: ' + JSON.stringify(feeData));
    // this.logger.debug('lastBaseFeePerGas: ' + lastBaseFeePerGas);
    // this.logger.debug('=================== Profiling ===================');
    // this.logger.debug('feeData took ' + (chkpt2 - chkpt1) + ' ms');
    // this.logger.debug('lastBaseFeePerGas took ' + (chkpt3 - chkpt2) + ' ms');
    // this.logger.debug('cacheManager.set took ' + (chkpt4 - chkpt3) + ' ms');
    // this.logger.debug(
    //   '***************************************************\n\n',
    // );
  }

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
}
