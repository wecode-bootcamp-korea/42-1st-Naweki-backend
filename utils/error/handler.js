const globalErrorHandler = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ message: err.message })
}

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(err => next({
      statusCode: err.statusCode || 500,
      message: err.message
    }))
  }
}

module.exports = {
  globalErrorHandler,
  catchAsync,
}