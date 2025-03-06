import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { excludeUrl } from 'src/common/constant/log';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: WalletService,
  ) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { ip, method, originalUrl, body, query } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', async () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} | Body: ${JSON.stringify(
          body,
        )} | Query: ${JSON.stringify(query)}`,
      );
      if (
        statusCode != 404 &&
        (excludeUrl.some((url) => originalUrl.includes(url)) === false ||
          statusCode > 400)
      ) {
        const tokenIndex = request.rawHeaders.findIndex(
          (item) => item === 'authorization',
        );
        const token =
          tokenIndex !== -1 ? request.rawHeaders[tokenIndex + 1] : '';
        let userAddress = '';
        try {
          if (token) {
            userAddress =
              token && (await this.userService.getUser(token)).userAddress;
          }
        } catch (e) {}
        await this.prisma.httpLog.create({
          data: {
            method,
            url: originalUrl,
            statusCode: Number(statusCode),
            userAgent,
            ip,
            body: JSON.stringify(body),
            query: JSON.stringify(query),
            userAddress: userAddress,
          },
        });
      }
    });

    next();
  }
}
