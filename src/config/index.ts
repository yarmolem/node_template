// Port
const PORT = process.env.PORT ?? 8080

// DB
const DB_NAME = process.env.DB_NAME ?? ''
const DB_PASSWORD = process.env.DB_PASSWORD ?? ''
const DB_USERNAME = process.env.DB_USERNAME ?? ''

export default {
  port: PORT,
  db: { name: DB_NAME, user: DB_USERNAME, pass: DB_PASSWORD }
}
