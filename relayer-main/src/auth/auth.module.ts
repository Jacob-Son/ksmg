import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { CustomStrategy } from './custom-auth/custom.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

// here, we register JWT module just for the test login purpose
@Module({
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }), // 환경 변수 전역 적용
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        console.log('JWT Secret from ConfigService:', jwtSecret); // 디버깅 로그 추가
        if (!jwtSecret) {
          throw new Error('JWT_SECRET is missing in environment variables');
        }
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  providers: [AuthService, CustomStrategy],
  exports: [AuthService, CustomStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
