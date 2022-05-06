const Sequelize = require('sequelize')
const dbConfig = require('../config/db.config')

const { HOST, USER, PASSWORD, DB, DIALECT } = dbConfig
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  dialect: DIALECT,
  host: HOST
})

const db = {}
db.Sequelize = Sequelize,
db.sequelize = sequelize,
db.VehicleModel = require('./vehicle.model')(sequelize, Sequelize)

module.exports = db