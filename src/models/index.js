const { Sequelize, sequelize } = require('../db/DataBase')

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.DriverModel = require('./driver.model')(sequelize, Sequelize)
db.VehicleModel = require('./vehicle.model')(sequelize, Sequelize)

module.exports = db