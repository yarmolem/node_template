import config from './config'

export const isDev = config.mode === 'development'
export const UNKNOWN_ERROR = [{ field: '*', message: 'Contacte con el administrador.' }]
