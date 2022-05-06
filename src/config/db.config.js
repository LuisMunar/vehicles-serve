const { HOST_DB, USER_DB, PASSWORD_DB, DB } = require('./environments.config')

const dbConfig = {
  HOST_DB,
  USER_DB,
  PASSWORD_DB,
  DB,
  DIALECT: 'mysql'
}

module.exports = dbConfig