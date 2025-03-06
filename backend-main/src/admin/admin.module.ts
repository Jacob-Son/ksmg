import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CombineService } from 'src/combine/combine.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, CombineService],
})
export class AdminModule {}
