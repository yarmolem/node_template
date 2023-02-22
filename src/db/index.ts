import { prisma } from '@src/data-source'
import logger from '@src/utils/logger'

export default class Database {
  events() {
    process
      .on('SIGTERM', () => {
        prisma.$disconnect()
        console.log('\nDisconnected from db')
        process.exit(1)
      })
      .on('SIGINT', () => {
        prisma.$disconnect()
        console.log('\nDisconnected from db')
        process.exit(1)
      })
  }

  async connect() {
    this.events()

    try {
      await prisma.$connect()

      logger.info('Connected to the DB.')
    } catch (error) {
      logger.error('Fail connection to the DB.')
      console.log({ error })
    }
  }
}
