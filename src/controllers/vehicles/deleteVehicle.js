const { validationResult } = require('express-validator')
const { setFormatResponse } = require('../../helpers')
const { VehicleModel } = require('../../models')

const deleteVehicle = async (req, res, next) => {
  try {
    const { errors } = validationResult(req)
    if(errors.length > 0) {
      setFormatResponse(res, 400, errors)
      return
    }

    const { id } = req.query
    const vehicle = await VehicleModel.findByPk(id)

    if(!vehicle) {
      setFormatResponse(res, 400, 'Vehicle does not exist')
    }

    await vehicle.destroy()
    setFormatResponse(res, 204)
  } catch (error) {
    next(error)
  }
}

module.exports = deleteVehicle