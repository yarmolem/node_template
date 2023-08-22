import 'dotenv/config'
import { z } from 'zod'

const server = z.object({
  PORT: z.string(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_USERNAME: z.string(),
  DATABASE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production'])
})

const processEnv: Record<keyof z.infer<typeof server>, string | undefined> = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV
}

const parsed = server.safeParse(processEnv)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

const env = process.env as z.infer<typeof server>

export default {
  mode: env.NODE_ENV,
  server: {
    port: env.PORT
  },
  db: {
    url: env.DATABASE_URL,
    name: env.DB_NAME,
    password: env.DB_PASSWORD,
    username: env.DB_USERNAME
  }
}
