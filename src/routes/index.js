const routes = (app) => {
  app.use('/drivers', require('./driversRoute'))
  app.use('/vehicles', require('./vehiclesRoute'))
}

module.exports = routes