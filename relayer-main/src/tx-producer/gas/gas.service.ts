import { Injectable } from '@nestjs/common';
import { ServiceType, FunctionType } from '@prisma/client';
// buy: estimatedGas = (223050) * (minting amount) + (86000)
// transfer: estimatedGas = 63055n, 80426n
// burn: estimatedGas = 56878n
// gas estimation
@Injectable()
export class GasService {
  async getEstimatedGas(
    serviceType: ServiceType,
    functionType: FunctionType,
    options?: any,
  ): Promise<bigint> {
    let estimatedGas: bigint;

    switch (serviceType) {
      case ServiceType.EBOOK:
        switch (functionType) {
          case FunctionType.BUY:
            if (!options.mintingAmount) throw new Error('Invalid options');
            estimatedGas = 224000n * BigInt(options.mintingAmount) + 86000n;
            break;
          case FunctionType.TRANSFER:
            estimatedGas = 86000n;
            break;
          case FunctionType.BURN:
            estimatedGas = 64000n;
          case FunctionType.MINT:
            estimatedGas = 120000n;
            break;
          default:
            throw new Error('Invalid functionType');
        }
        break;
      default:
        throw new Error('Invalid serviceType');
    }

    return estimatedGas;
  }
}
