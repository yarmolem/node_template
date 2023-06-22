import * as dotenv from 'dotenv'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

dotenv.config()

const URI = process.env.DATABASE_URL ?? ''
const migrationClient = postgres(URI, { max: 1 })

migrate(drizzle(migrationClient, { logger: true }), { migrationsFolder: 'drizzle' })
  .then(() => {
    console.log('Migration Done')
    process.exit()
  })
  .catch((err) => {
    console.log('Error Migration: ', err)
    process.exit()
  })
