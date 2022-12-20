import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export interface Field {
  key: string
  value: string | number | boolean | null
  sqlQuery: string
}

export const createAndWheres = <Entity extends ObjectLiteral>(qb: SelectQueryBuilder<Entity>, fields: Field[]) => {
  const parameters: Record<string, string | number | boolean | null> = {}

  for (const [i, field] of fields.entries()) {
    if (i === 0) qb.where(field.sqlQuery)
    if (i !== 0) qb.andWhere(field.sqlQuery)

    parameters[field.key] = field.value
  }

  return { newQb: qb, parameters }
}
