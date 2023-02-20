import { DataSource } from 'typeorm'

import config from './config'

import Post from './schema/Post/post.model'
import User from './schema/User/user.model'

const AppDataSource = new DataSource({
  port: 5432,
  logging: true,
  type: 'postgres',
  host: 'localhost',
  synchronize: true,
  username: config.db.user,
  password: config.db.pass,
  database: config.db.name,
  entities: [User, Post]
})

export default AppDataSource
