import config from '@src/config'
import * as JWT from 'jsonwebtoken'

const KEY = config.jwt_secret

export const genJWT = (id: number, expiresIn = '24h'): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    JWT.sign({ id }, KEY, { expiresIn }, function (err, token) {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

export const verifyJWT = (token: string) => {
  try {
    return JWT.verify(token, KEY) as { id: number }
  } catch (error) {
    return null
  }
}
