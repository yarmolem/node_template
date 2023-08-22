import path from 'path'
import { DataSource } from 'typeorm'

import config from './config'
import { isDev } from './constants'
import { PostModel } from './schema/Post/post.model'
import { UserModel } from './schema/User/user.model'

const { host, port, name, password, username } = config.db
const URL = `postgresql://${username}:${password}@${host}:${port}/${name}`

const AppDataSource = new DataSource({
  url: URL,
  logging: isDev,
  type: 'postgres',
  entities: [UserModel, PostModel],
  migrations: [path.join(__dirname, './migrations/*')]
})

export default AppDataSource
