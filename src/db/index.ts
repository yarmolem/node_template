import logger from '@src/utils/logger'
import AppDataSource from '@src/data-source'

export default class Database {
  events() {
    process
      .on('SIGTERM', () => {
        AppDataSource.destroy()
          .then(() => {
            console.log('\nDisconnected from db')
          })
          .catch(() => {
            console.log('\nError disconnecting from db')
          })
          .finally(() => {
            process.exit(1)
          })
      })
      .on('SIGINT', () => {
        AppDataSource.destroy()
          .then(() => {
            console.log('\nDisconnected from db')
          })
          .catch(() => {
            console.log('\nError disconnecting from db')
          })
          .finally(() => {
            process.exit(1)
          })
      })
  }

  async connect() {
    this.events()

    try {
      await AppDataSource.initialize()

      logger.info('Connected to the DB.')
    } catch (error) {
      console.error(error)
      logger.error('Fail connection to the DB.')

      process.exit(1)
    }
  }
}
