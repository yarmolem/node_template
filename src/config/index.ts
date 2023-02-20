// Server
const PORT = process.env.PORT ?? 8080

// DB
const DB_NAME_DEV = process.env.DB_NAME_DEV ?? ''
const DB_PASSWORD_DEV = process.env.DB_PASSWORD_DEV ?? ''
const DB_USERNAME_DEV = process.env.DB_USERNAME_DEV ?? ''

// JWT
const JWT_SECRET_DEV = process.env.JWT_SECRET_DEV ?? ''

const config = {
  DEV: {
    port: PORT,
    jwt_secret: JWT_SECRET_DEV,
    db: {
      name: DB_NAME_DEV,
      user: DB_USERNAME_DEV,
      pass: DB_PASSWORD_DEV
    }
  }
}

export default config.DEV
