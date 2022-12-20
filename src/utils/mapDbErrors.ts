import FieldError from '@src/models/FieldError'

export const mapDbErrors = (_errorMessage: string): { errors: FieldError[] } => {
  return { errors: [{ field: '*', message: 'Contacte con el administrador.' }] }
}
