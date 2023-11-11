/** @type { import("drizzle-kit").Config } */
export default {
  driver: 'pg',
  out: './drizzle',
  schema: './src/schema/*/*.schema.ts'
}
