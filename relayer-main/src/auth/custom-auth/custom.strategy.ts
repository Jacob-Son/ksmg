import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// =====
// strategy from the community
// source: https://blog.iamstarcode.com/using-supabase-authentication-in-nestjs
// =====

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('CUSTOM_JWT_SECRET'),
    });
  }

  async validate(request: Request) {
    return request;
  }
}
