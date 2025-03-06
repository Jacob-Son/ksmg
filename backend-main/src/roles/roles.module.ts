import { Global, Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

@Global()
@Module({})
export class RolesModule {
  providers: [RolesGuard];
  exports: [RolesGuard];
}
