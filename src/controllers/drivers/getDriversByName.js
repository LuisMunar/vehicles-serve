const Sequelize = require('sequelize')

const { DriverModel } = require('../../models')
const { setFormatResponse } = require('../../helpers')

const getDriversByName = async (req, res, next) => {
  try {
    const { name } = req.params

    const allDrivers = await DriverModel.findAll({
      order: [['id', 'ASC']],
      where: {
        [Sequelize.Op.or]: [
          { first_name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('first_name')), 'LIKE', '%' + name.toLowerCase() + '%') },
          { last_name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('last_name')), 'LIKE', '%' + name.toLowerCase() + '%') }
        ]
      }
    })

    setFormatResponse(res, 200, allDrivers)
  } catch (error) {
    next(error)
  }
}

module.exports = getDriversByName