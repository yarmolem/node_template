export const mapEntities = (alias: string, entities: string[], data: any[]) => {
  const newData: object[] = []

  for (const row of data) {
    let object: Record<string, string> = {}

    for (const key of Object.keys(row)) {
      if (key.includes(alias)) {
        object[key.replace(`${alias}_`, '')] = (row as Record<string, string>)[key]
        continue
      }

      const parentKey = entities.find((entitie) => key.includes(entitie))

      if (parentKey) {
        object[parentKey.toUpperCase()] = {
          // @ts-ignore
          ...object[parentKey.toUpperCase()],
          [key.replace(`${parentKey}_`, '').toUpperCase()]: (row as Record<string, string>)[key]
        }
      }
    }

    newData.push(object)
  }

  return newData
}

export const mapEntitiesv2 = <T extends object>(
  alias: string,
  entities: Iterable<readonly [string, string]>,
  data: T[]
) => {
  const newData: object[] = []
  const mapEntities = new Map(entities)

  for (const row of data) {
    let newRow: Record<string, string> = {}

    for (const key of Object.keys(row)) {
      if (key.split('_')[0] === alias) {
        newRow[key.replace(`${alias}_`, '')] = (row as Record<string, string>)[key]
        continue
      }

      const innerAlias = key.split('_')[0]
      const parentKey = mapEntities.get(innerAlias)

      if (parentKey) {
        newRow[parentKey] = {
          // @ts-ignore
          ...newRow[parentKey],
          [key.replace(`${innerAlias}_`, '').toUpperCase()]: (row as Record<string, string>)[key]
        }
      }
    }

    newData.push(newRow)
  }

  return newData as T[]
}
