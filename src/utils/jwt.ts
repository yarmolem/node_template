import * as JWT from 'jsonwebtoken'

const KEY = 'KEY_TO_ENCRYPT'

export const genJWT = (id: number, expiresIn = '24h'): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    JWT.sign({ id }, KEY, { expiresIn }, function (err, token) {
      if (err) {
        reject(err)
      }

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

export const decodeJWT = (token: string) => JWT.decode(token)
