import path from 'path'
import { DataSource } from 'typeorm'

import config from '@src/config'
import logger from '@src/utils/logger'

export const AppDataSource = new DataSource({
  port: 5432,
  logging: true,
  type: 'postgres',
  host: 'localhost',
  synchronize: true,
  username: config.db.user,
  password: config.db.pass,
  database: 'node_template',
  entities: [path.resolve(__dirname, '../**/*.model.ts')],
  migrations: [path.resolve(__dirname, '../migrations/*.js')]
})

export default class Database {
  events() {
    process
      .on('SIGTERM', () => {
        AppDataSource.destroy()
        console.log('\nDisconnected from db')
        process.exit(1)
      })
      .on('SIGINT', () => {
        AppDataSource.destroy()
        console.log('\nDisconnected from db')
        process.exit(1)
      })
  }

  async connect() {
    this.events()

    try {
      await AppDataSource.initialize()

      logger.info('Connected to the DBs.')
    } catch (error) {
      logger.error('Fail connection to the DB.')
      console.log({ error })
    }
  }
}
