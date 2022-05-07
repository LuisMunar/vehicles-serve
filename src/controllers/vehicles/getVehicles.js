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

    const { page, size, drivers_id } = req.query
    const { limit, offset } = getPaginatorParams(page, size)
    
    if(drivers_id) {
      const formatArrayDriversId = JSON.parse(drivers_id)
      const getDriversPromisesArray = []

      formatArrayDriversId.forEach((driverId, i) => {
        getDriversPromisesArray.push(
          VehicleModel.findAndCountAll({
            order: [['id', 'ASC']],
            limit,
            offset,
            include: {
              model: db.DriverModel
            },
            where: {
              driver_id: driverId
            }
          })
        )
      })

      const promisesResult = await Promise.allSettled(getDriversPromisesArray)
      const result = promisesResult
        .map(({ value }) => value)
        .reduce((prevItem, nextItem) => ({ count: prevItem.count+nextItem.count, rows: [...prevItem.rows, ...nextItem.rows] }))

      setFormatResponse(res, 200, getPaginatorData(result, page, limit))
      return
    }

    const result = await VehicleModel.findAndCountAll({
      order: [['id', 'ASC']],
      limit,
      offset,
      include: {
        model: db.DriverModel
      }
    })
    
    setFormatResponse(res, 200, getPaginatorData(result, page, limit))
  } catch (error) {
    next(error)
  }
}

module.exports = getVehicles