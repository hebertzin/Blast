import { redis } from '.'
import { Redis } from '../../domain/redis'

export class RedisImplementation implements Redis {
  async set(key: string, value: string, expiration: number): Promise<void> {
    await redis.set(key, value, 'EX', expiration)
  }
  async get(key: string): Promise<string> {
    return await redis.get(key)
  }
}
