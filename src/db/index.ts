import logger from '@src/utils/logger'
import AppDataSource from '@src/data-source'

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

      logger.info('Connected to the DB.')
    } catch (error) {
      logger.error('Fail connection to the DB.')
      console.log({ error })
    }
  }
}
