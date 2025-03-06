import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SignerController } from './signer.controller';
import { SignerService } from './signer.service';

@Module({
  imports: [UsersModule],
  controllers: [SignerController],
  providers: [SignerService],
})
export class SignerModule {}
