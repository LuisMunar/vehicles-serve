const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

module.exports = {
  HOST_DB: process.env.HOST_DB,
  USER_DB: process.env.USER_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  DB: process.env.DB,
  SERVER_PORT: process.env.SERVER_PORT
}