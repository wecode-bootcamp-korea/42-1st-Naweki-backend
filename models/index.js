const { DataSource } = require('typeorm')

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

database.initialize()
  .then(() => {
    console.log('database has been initailized.')
  })
  .catch(err => {
    console.log('Failed to initialize database.', err)
    database.destroy()
  })

module.exports = database