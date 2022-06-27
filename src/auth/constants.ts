export default () => ({
  secret: process.env.JWT_SECRET || 'secret-api',
  expirationTime: process.env.JWT_EXPIRATION_TIME || '1s',
})