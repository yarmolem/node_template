import 'dotenv/config'

import pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

const config = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
}

const migrationClient = new pg.Pool(config)

const main = async () => {
  try {
    await migrationClient.connect()
    const db = drizzle(migrationClient, { logger: true })
    await migrate(db, { migrationsFolder: 'drizzle' })

    console.log('Migration Done')
    process.exit(0)
  } catch (error) {
    console.log('Error Migration: ', error)
    process.exit(0)
  }
}

main()
