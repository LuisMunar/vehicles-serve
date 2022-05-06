const express = require('express')
const { check } = require('express-validator')

const getVehicles = require('../controllers/vehicles/getVehicles')
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
router.post(
  '/',
  [
    check('driver_id').notEmpty(),
    check('plate').notEmpty(),
    check('model').notEmpty(),
    check('type').notEmpty(),
    check('capacity').notEmpty(),
  ],
  createVehicle
)
router.put(
  '/',
  [
    check('id').notEmpty(),
    check('plate').notEmpty(),
    check('model').notEmpty(),
    check('type').notEmpty(),
    check('capacity').notEmpty(),
  ],
  updateVehicle
)
router.delete(
  '/',
  [
    check('id').notEmpty()
  ],
  deleteVehicle
)

module.exports = router