import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { TxProducerService } from './tx-producer.service';
import {
  // BuyNftDto,
  MintNftDto,
  TransferNftDto,
  BurnNftDto,
  // SetPlatformRoyaltyRatioDto,
} from './producer/dto/ebook/tx-producer.dto';

@Controller('tx')
@ApiTags('tx')
export class TxProducerController {
  constructor(private readonly txProducerService: TxProducerService) {}

  // @Post('ebook/buy')
  // @Public()
  // @ApiOperation({
  //   summary:
  //     '장바구니의 NFT를 일괄 구매 (여러 NFT를 한 번에 구매할 수 있는 기능)',
  // })
  // async buyNft(@Body() buyNftDto: BuyNftDto): Promise<{ txHash: string }> {
  //   return await this.txProducerService.buyNft(buyNftDto);
  // }

  @Post('ebook/mint')
  @Public()
  @ApiOperation({
    summary: '새로운 NFT를 민팅',
  })
  async mintNft(@Body() mintNftDto: MintNftDto): Promise<{ txHash: string }> {
    return await this.txProducerService.mintNft(mintNftDto);
  }

  @Post('ebook/transfer')
  @Public()
  @ApiOperation({
    summary: 'NFT를 다른 주소로 전송',
  })
  async transferNft(
    @Body() transferNftDto: TransferNftDto,
  ): Promise<{ txHash: string }> {
    return await this.txProducerService.transferNft(transferNftDto);
  }

  @Post('ebook/burn')
  @Public()
  @ApiOperation({
    summary: 'NFT를 소각',
  })
  async burnNft(@Body() burnNftDto: BurnNftDto): Promise<{ txHash: string }> {
    return await this.txProducerService.burnNft(burnNftDto);
  }

  // FIXME: TODO: Only Admin
  // @Post('ebook/set-royalty')
  // @Public()
  // @ApiOperation({
  //   summary:
  //     '[Only Admin] NFT 플랫폼 loyalty ratio 설정 (0 ~ 100 for 0% ~ 100%)',
  // })
  // async setRoyalty(
  //   @Body() setRoyaltyDto: SetPlatformRoyaltyRatioDto,
  // ): Promise<{ txHash: string }> {
  //   return await this.txProducerService.setPlatformRoyaltyRatio(setRoyaltyDto);
  // }
}
