import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('3000'),
  ACCESS_KEY: z.string().optional(),
  SECRET_KEY: z.string().optional(),
  REGION: z.string().optional(),
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
