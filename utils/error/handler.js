const globalErrorHandler = async (err, req, res, next) => {
  console.error(err.stack)
  err.statusCode = err.statusCode || 500
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