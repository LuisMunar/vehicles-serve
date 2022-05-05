const express = require('express')
const cors = require('cors')

const routes = require('./src/routes')
const port = 8000
const corsOptions = {origin: ['http://localhost:3000']}

const app = express()
app.use(cors(corsOptions))
app.use(express.json({ extended: true }))
routes(app)

app.listen(port, () => console.log(`Server running on port ${ port }`))