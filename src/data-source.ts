import { DataSource } from 'typeorm'

import config from './config'

import { PostModel } from './schema/Post/post.model'
import { UserModel } from './schema/User/user.model'
import path from 'path'

const AppDataSource = new DataSource({
  port: 5432,
  logging: true,
  type: 'postgres',
  host: 'localhost',
  database: config.db.name,
  username: config.db.username,
  password: config.db.password,
  entities: [UserModel, PostModel],
  migrations: [path.join(__dirname, './migrations/*')]
})

export default AppDataSource
