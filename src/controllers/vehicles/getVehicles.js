const { validationResult } = require('express-validator')

const { VehicleModel } = require('../../models')
const { getPaginatorParams, getPaginatorData, setFormatResponse } = require('../../helpers')
const db = require('../../models')

const getVehicles = async (req, res, next) => {
  try {
    const { errors } = validationResult(req)
    if(errors.length > 0) {
      setFormatResponse(res, 400, errors)
      return
    }

    const { query: { page, size, user } } = req
    const { limit, offset } = getPaginatorParams(page, size)

    const result = await VehicleModel.findAndCountAll({
      order: [['id', 'ASC']],
      limit,
      offset,
      include: {
        model: db.DriverModel
      },
      where: user ? { driver_id: user } : {}
    })

    setFormatResponse(res, 200, getPaginatorData(result, page, limit))
  } catch (error) {
    next(error)
  }
}

module.exports = getVehicles