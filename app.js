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
  try {
    app.listen(PORT, () => {
      console.log(`Server is Listening on PORT : ${PORT}`)
    })
  } catch (err) {
    console.err(err)
  }
}

start()