import config from './config'

export const COOKIE_NAME = 'node-qid'
export const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 // 24h
export const isDev = config.mode === 'development'
export const UNKNOWN_ERROR = [{ field: '*', message: 'Contacte con el administrador.' }]
