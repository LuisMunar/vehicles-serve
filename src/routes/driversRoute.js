const express = require('express')
const { check } = require('express-validator')

const getDrivers = require('../controllers/drivers/getDrivers')
const getDriversByName = require('../controllers/drivers/getDriversByName')

const router = express.Router()
router.get(
  '/',
  [check('id').notEmpty()],
  getDrivers
)
router.get(
  '/:name',
  getDriversByName
)

module.exports = router