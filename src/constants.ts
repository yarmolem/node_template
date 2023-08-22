import config from './config'

export const COOKIE_NAME = 'node-qid'
export const isDev = config.mode === 'development'
export const UNKNOWN_ERROR = [{ field: '*', message: 'Contacte con el administrador.' }]
