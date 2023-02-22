import Token from './Token'

export default class TokenManager {
  static user = new Token<{ id: number }>({ entity: 'AUTH.USER', expiresIn: '24h' })
}
