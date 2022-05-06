const Sequelize = require('sequelize')
const dbConfig = require('../config/db.config')

const { HOST_DB, USER_DB, PASSWORD_DB, DB, DIALECT } = dbConfig
const sequelize = new Sequelize(DB, USER_DB, PASSWORD_DB, {
  dialect: DIALECT,
  host: HOST_DB
})

module.exports = {
  Sequelize,
  sequelize
}