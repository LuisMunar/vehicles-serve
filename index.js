const express = require('express')
const cors = require('cors')

const routes = require('./src/routes')
const db = require('./src/models')
const { SERVER_PORT } = require('./src/config/environments.config')

const corsOptions = {origin: ['http://localhost:3000']}

const app = express()
app.use(cors(corsOptions))
app.use(express.json({ extended: true }))
routes(app)
db.sequelize

app.listen(SERVER_PORT, () => console.log(`Server running on port ${ SERVER_PORT }`))