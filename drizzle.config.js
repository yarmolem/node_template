import * as dotenv from 'dotenv'
dotenv.config()

/** @type { import("drizzle-kit").Config } */
export default {
  driver: 'pg',
  out: './drizzle',
  schema: './src/schema/*/*.schema.ts',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? ''
  }
}
