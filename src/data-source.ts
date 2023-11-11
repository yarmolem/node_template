import { Pool } from 'pg'
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'

import config from './config'
import logger from '@src/utils/logger'
import { users } from '@src/schema/User/user.schema'

const schema = {
  users
}

export type DrizzleORM = NodePgDatabase<typeof schema>

const pool = new Pool(config.db)
const orm = drizzle(pool, { schema })

async function connect(): Promise<void> {
  await pool.connect()
  logger.info('Connected to the DB.')
}

export { orm, pool, connect }
