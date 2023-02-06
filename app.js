require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(routes)

const PORT = process.env.PORT

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' })
})

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT : ${PORT}`)
  })
}

start()