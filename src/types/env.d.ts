declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MYSQL_URL: string
      API_PORT: number
      DEFAULT_SALT_ROUNDS: number
      JWT_SECRET: string
      JWT_EXPIRATION_TIME: string
    }
  }
}

export { };
