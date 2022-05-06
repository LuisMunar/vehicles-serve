(async () => {
  const express = require('express')
  const cors = require('cors')

  const routes = require('./src/routes')
  const db = require('./src/models')
  const { SERVER_PORT } = require('./src/config/environments.config')

  try {
    const app = express()
    const corsOptions = {origin: ['http://localhost:3000']}
    app.use(cors(corsOptions))
    app.use(express.json({ extended: true }))
    routes(app)
    await db.sequelize.authenticate()
    app.listen(SERVER_PORT, () => console.log(`SERVER RUNNING ON PORT => ${ SERVER_PORT }`))
  } catch (error) {
    console.log('ERROR TRYING TO START THE SERVER => ', error)
  }
})()