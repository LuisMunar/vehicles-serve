const routes = (app) => {
  app.use('/vehicles', require('./vehiclesRoute'))
}

module.exports = routes