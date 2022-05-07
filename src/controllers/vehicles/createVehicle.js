const { validationResult } = require('express-validator')

const { setFormatResponse } = require('../../helpers')
const { DriverModel, VehicleModel } = require('../../models')

const createVehicle = async (req, res, next) => {
  try {
    const { errors } = validationResult(req)
    if(errors.length > 0) {
      setFormatResponse(res, 400, errors)
      return
    }

    const { body } = req
    const { driver_id } = body

    const driver = await DriverModel.findOne({ where: { id: driver_id } })
    if(!driver) {
      setFormatResponse(res, 400, 'Driver does not exist')
      return
    }

    const result = await VehicleModel.create(body)
    setFormatResponse(res, 201, result)
  } catch (error) {
    next(error)
  }
}

module.exports = createVehicle