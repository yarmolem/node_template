import path from 'path'
import { DataSource } from 'typeorm'

import config from './config'

const AppDataSource = new DataSource({
  port: 5432,
  logging: true,
  type: 'postgres',
  host: 'localhost',
  synchronize: true,
  username: config.db.user,
  password: config.db.pass,
  database: 'node_template',
  entities: [path.resolve(__dirname, './**/*.model.{ts,js}')]
})

export default AppDataSource
