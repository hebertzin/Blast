import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number(),
  ACCESS_KEY: z.string(),
  SECRET_KEY: z.string(),
  REGION: z.string(),
})

let _env
const isTestEnvironment = process.env.NODE_ENV === 'test'

if (isTestEnvironment) {
  _env = envSchema.partial().safeParse(process.env)
} else {
  _env = envSchema.strict().safeParse(process.env)
}

if (!_env.success) {
  throw new Error('Invalid environment variables')
}

export const env = _env.data
