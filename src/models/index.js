const { Sequelize, sequelize } = require('../db/DataBase')

const db = {}
db.Sequelize = Sequelize,
db.sequelize = sequelize,
db.VehicleModel = require('./vehicle.model')(sequelize, Sequelize)
db.DriverModel = require('./driver.model')(sequelize, Sequelize)

module.exports = db