const express = require('express')

const getDrivers = require('../controllers/drivers/getDrivers')

const router = express.Router()
router.get(
  '/',
  getDrivers
)

module.exports = router