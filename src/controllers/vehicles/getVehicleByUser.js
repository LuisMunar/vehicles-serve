const { validationResult } = require('express-validator')

const getVehicleByUser = (req, res) => {
  const { errors } = validationResult(req)
  if(errors.length > 0) {
    res.status(400).json({ result: errors })
    return
  }

  res.status(200).json({ result: 'Vehicles by user' })
}

module.exports = getVehicleByUser