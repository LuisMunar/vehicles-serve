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

    const { page, size, driver_id } = req.query
    const { limit, offset } = getPaginatorParams(page, size)

    const result = await VehicleModel.findAndCountAll({
      order: [['id', 'ASC']],
      limit,
      offset,
      include: {
        model: db.DriverModel
      },
      where: driver_id ? { driver_id } : {}
    })

    setFormatResponse(res, 200, getPaginatorData(result, page, limit))
  } catch (error) {
    next(error)
  }
}

module.exports = getVehicles