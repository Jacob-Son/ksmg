import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminTxRecordDto } from './dto/admin.tx-records.dto';
import { GetAllDto } from './dto/query.dto';
import { TxStatus } from '@prisma/client';

@Injectable()
export class AdminTxRecordsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAdminTxRecordDto) {
    return await this.prisma.adminTxRecord.create({
      data: dto,
    });
  }

  async findOneByTxHash(txHash: string) {
    const txRecord = await this.prisma.adminTxRecord.findUnique({
      where: { txHash },
    });

    return [txRecord]; // important: return array to be consistent with the return type of the interceptor
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

    where.OR = [{ fromAddress: address }, { toAddress: address }];

    if (status) {
      where.status = status;
    }

    if (serviceType) {
      where.serviceType = serviceType;
    }

    if (functionType) {
      where.functionType = functionType;
    }

    const txRecords = await this.prisma.adminTxRecord.findMany({
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
    return await this.prisma.adminTxRecord.findMany({
      where: { status: TxStatus.PENDING },
    });
  }
}
