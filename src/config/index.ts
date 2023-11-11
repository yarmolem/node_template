import { z } from 'zod'

const server = z.object({
  PORT: z.string().default('8081'),
  DB_NAME: z.string(),
  DB_PORT: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production'])
})

const processEnv: Record<keyof z.infer<typeof server>, string | undefined> = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  NODE_ENV: process.env.NODE_ENV
}

const parsed = server.safeParse(processEnv)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

const env = process.env as z.infer<typeof server>

export default {
  port: env.PORT,
  db: {
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASS,
    port: Number(env.DB_PORT)
  }
}
