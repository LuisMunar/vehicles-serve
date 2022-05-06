const express = require('express')
const { check } = require('express-validator')

const getVehicles = require('../controllers/vehicles/getVehicles')
const getVehicleByUser = require('../controllers/vehicles/getVehicleByUser')
const createVehicle = require('../controllers/vehicles/createVehicle')
const updateVehicle = require('../controllers/vehicles/updateVehicle')
const deleteVehicle = require('../controllers/vehicles/deleteVehicle')

const router = express.Router()
router.get(
  '/',
  [
    check('page').notEmpty(),
    check('size').notEmpty()
  ],
  getVehicles
)
router.post('/', createVehicle)
router.put('/:id', updateVehicle)
router.delete('/:id', deleteVehicle)

module.exports = router