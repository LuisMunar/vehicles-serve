const { DRIVER } = require('../config/tableNames.config')

module.exports = (sequelize, Sequelize) => {
  const DriverModel = sequelize.define(
    DRIVER,
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      phone: {
        type: Sequelize.STRING
      },
      avatar_url: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      creation_date: {
        allowNull: false,
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      tableName: DRIVER,
      timestamps: false
    }
  )

  return DriverModel
}