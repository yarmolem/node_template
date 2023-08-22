import path from 'path'
import { DataSource } from 'typeorm'

import config from './config'
import { isDev } from './constants'
import { PostModel } from './schema/Post/post.model'
import { UserModel } from './schema/User/user.model'

const URL = config.db.url ?? `postgresql://${config.db.username}:${config.db.password}@postgres:5432/${config.db.name}`

const AppDataSource = new DataSource({
  url: URL,
  logging: isDev,
  type: 'postgres',
  entities: [UserModel, PostModel],
  migrations: [path.join(__dirname, './migrations/*')]
})

export default AppDataSource
