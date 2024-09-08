import Redis from 'ioredis'
import { env } from '../infra/config/env'

export const redis = new Redis({
  password: env.REDIS_PASSWORD,
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
})
