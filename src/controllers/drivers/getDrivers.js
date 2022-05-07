const { DriverModel } = require('../../models')

const getDrivers = async (req, res, next) => {
  try {
    const { query: { id } } = req
    console.log(id)

    const result = await DriverModel.findAndCountAll({
      order: [['id', 'ASC']],
      where: id ? { id } : {}
    })

    res.status(200).json({ result })
  } catch (error) {
    next(error)
  }
}

module.exports = getDrivers