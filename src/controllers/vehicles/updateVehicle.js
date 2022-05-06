const { validationResult } = require('express-validator')
const { setFormatResponse } = require('../../helpers')
const { VehicleModel } = require('../../models')

const updateVehicle = async (req, res) => {
  try {
    const { errors } = validationResult(req)
    if(errors.length > 0) {
      setFormatResponse(res, 400, errors)
      return
    }
    
    const { body } = req
    const { id, plate, model, type, capacity } = body
    const vehicle = await VehicleModel.findOne({ where: { id } })

    if(!vehicle) {
      setFormatResponse(res, 400, 'Vehicle does not exist')
      return
    }

    const result = await vehicle.update({
      plate,
      model,
      type,
      capacity
    })
    setFormatResponse(res, 200, result)
  } catch (error) {
    next(error)
  }
}

module.exports = updateVehicle