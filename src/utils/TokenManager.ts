import Token from './Token'

export default {
  user: new Token<{ id: number }>({ entity: 'AUTH.USER', expiresIn: '24h' })
}
