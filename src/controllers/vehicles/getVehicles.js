const { validationResult } = require('express-validator')

const { VehicleModel } = require('../../models')
const { getPaginatorParams, getPaginatorData } = require('../../helpers')

const getVehicles = async (req, res, next) => {
  try {
    const { errors } = validationResult(req)
    if(errors.length > 0) {
      res.status(400).json({ result: errors })
      return
    }

    const { query: { page, size, user } } = req
    const { limit, offset } = getPaginatorParams(page, size)

    const result = await VehicleModel.findAndCountAll({
      order: [['id', 'ASC']],
      limit,
      offset,
      where: user ? { driver_id: user } : {}
    })

    res.status(200).json({ result: getPaginatorData(result, page, limit) })
  } catch (error) {
    next(error)
  }
}

module.exports = getVehicles