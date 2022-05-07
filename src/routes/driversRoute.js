const express = require('express')
const { check } = require('express-validator')

const getDrivers = require('../controllers/drivers/getDrivers')

const router = express.Router()
router.get(
  '/',
  [check('id').notEmpty()],
  getDrivers
)

module.exports = router