const message = require('../error/userErrMsg')

const globalErrorHandler = async (err, req, res, next) => {
  console.error(err)
  err.statusCode = message[err.message]?.statusCode || 500
  err.message = message[err.message]?.message
  res.status(err.statusCode).json({ message: err.message })
}

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(err => next(err))
  }
}

module.exports = {
  globalErrorHandler,
  catchAsync,
}
