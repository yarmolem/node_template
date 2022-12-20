// Server
const PORT = process.env.PORT ?? 8080

// DB
const DB_PASSWORD_DEV = process.env.DB_PASSWORD_DEV ?? ''
const DB_USERNAME_DEV = process.env.DB_USERNAME_DEV ?? ''

const config = {
  DEV: {
    port: PORT,
    db: {
      user: DB_USERNAME_DEV,
      pass: DB_PASSWORD_DEV
    }
  }
}

export default config.DEV
