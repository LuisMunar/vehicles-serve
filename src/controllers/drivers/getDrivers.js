const { validationResult } = require('express-validator')

const { DriverModel } = require('../../models')
const { setFormatResponse } = require('../../helpers')

const getDriver = async (req, res, next) => {
  try {
    const { errors } = validationResult(req)
    if(errors.length > 0) {
      setFormatResponse(res, 400, errors)
      return
    }

    const { id } = req.query
    const result = await DriverModel.findByPk(id)

    if(!result) {
      setFormatResponse(res, 200, 'Driver does not exist')
      return
    }

    setFormatResponse(res, 200, result)
  } catch (error) {
    next(error)
  }
}

module.exports = getDriver