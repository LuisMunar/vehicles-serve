const { VEHICLE } = require('../config/tableNames.config')

module.exports = (sequelize, Sequelize) => {
  const VehicleModel = sequelize.define(
    VEHICLE,
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      driver_id: {
        type: Sequelize.INTEGER
      },
      plate: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.STRING
      },
      creation_date: {
        allowNull: false,
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      tableName: VEHICLE,
      timestamps: false
    }
  )

  const DriverModel = require('./driver.model')(sequelize, Sequelize)
  VehicleModel.hasOne(DriverModel, {
    foreignKey: 'id'
  })
  VehicleModel.belongsTo(DriverModel, {
    foreignKey: 'id'
  })

  return VehicleModel
}