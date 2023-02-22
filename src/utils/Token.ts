import * as fs from 'fs'
import * as jwt from 'jsonwebtoken'

type TokenEntity = 'AUTH.USER'
type Payload<T extends Object> = T & { iat: number; exp: number; entity: TokenEntity }

interface TokenProps {
  expiresIn: string
  entity: TokenEntity
}

const publicKEY = fs.readFileSync('./jwt_public.pem', 'utf8')
const privateKEY = fs.readFileSync('./jwt_private.pem', 'utf8')

// TODO: Verificar el origin de la request

// const issuer = 'Mysoft corp'
// const subject = 'some@user.com'
// const audience = 'http://mysoftcorp.in'

export default class Token<T extends Object> {
  expiresIn: string
  entity: TokenEntity

  constructor({ entity, expiresIn }: TokenProps) {
    this.entity = entity
    this.expiresIn = expiresIn
  }

  sign(payload: T) {
    return jwt.sign({ ...payload, entity: this.entity }, privateKEY, { expiresIn: this.expiresIn, algorithm: 'RS256' })
  }

  verify(token: string) {
    try {
      return jwt.verify(token, publicKEY, { algorithms: ['RS256'] }) as Payload<T>
    } catch (err) {
      return null
    }
  }

  decode(token: string) {
    return jwt.decode(token, { complete: true }) as Payload<T> | null
  }
}
