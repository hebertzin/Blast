import 'dotenv/config'
import { z } from 'zod'
import * as dotenv from 'dotenv'

dotenv.config()
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  ACCESS_KEY: z.string(),
  SECRET_KEY: z.string(),
  REGION: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success == false) {
  throw new Error(`Error with env variables : ${_env.error}`)
}

export const env = _env.data
