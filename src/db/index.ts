import logger from '@src/utils/logger'

export default class Database {
  events(): void {
    // process
    //   .on('SIGTERM', () => {
    //     prisma
    //       .$disconnect()
    //       .then(() => {
    //         console.log('\nDisconnected from db')
    //         process.exit(1)
    //       })
    //       .catch(() => {
    //         console.log('\nError disconnecting from db')
    //       })
    //   })
    //   .on('SIGINT', () => {
    //     prisma
    //       .$disconnect()
    //       .then(() => {
    //         console.log('\nDisconnected from db')
    //         process.exit(1)
    //       })
    //       .catch(() => {
    //         console.log('\nError disconnecting from db')
    //       })
    //   })
  }

  async connect(): Promise<void> {
    this.events()

    try {
      // TODO: Mover a un archivo para ejecutar con un script
      // await migrate(db, { migrationsFolder: 'drizzle' })
      logger.info('Connected to the DB.')
    } catch (error) {
      logger.error('Fail connection to the DB.')
      console.log({ error })
    }
  }
}
