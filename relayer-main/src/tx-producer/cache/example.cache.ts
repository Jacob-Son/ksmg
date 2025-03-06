import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

// example
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setName() {
    await this.cacheManager.set('name', 'jhp', 0); // 0 for no expiration
  }

  async getName() {
    const name = await this.cacheManager.get('name');
    return name;
  }
}
