import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserTxRecordDto } from './dto/user.tx-records.dto';
import { GetAllDto } from './dto/query.dto';
import { TxStatus } from '@prisma/client';

@Injectable()
export class UserTxRecordsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserTxRecordDto) {
    return await this.prisma.userTxRecord.create({
      data: dto,
    });
  }

  // Note: UserTxRecords have non-unique txHash
  async findManyByTxHash(txHash: string) {
    const txRecord = await this.prisma.userTxRecord.findMany({
      where: { txHash },
    });

    return txRecord; // important: return array to be consistent with the return type of the interceptor
  }

  async findAllByAddress(address: string, dto: GetAllDto) {
    // FIXME: here, `page` and `pageSize` are string type (typing doesn't convert them to number type)
    const {
      page,
      pageSize,
      sortField,
      sortOrder,
      status,
      serviceType,
      functionType,
    } = dto;

    const where = {} as any;

    where.OR = [{ sellerAddress: address }, { buyerAddress: address }];

    if (status) {
      where.status = status;
    }

    if (serviceType) {
      where.serviceType = serviceType;
    }

    if (functionType) {
      where.functionType = functionType;
    }

    const txRecords = await this.prisma.userTxRecord.findMany({
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
      orderBy: {
        [sortField]: sortOrder,
      },
      where,
    });

    // const total = await this.prisma.txRecord.count({ where });

    return txRecords;
  }

  async findAllPending() {
    return await this.prisma.userTxRecord.findMany({
      where: { status: TxStatus.PENDING },
    });
  }
}
