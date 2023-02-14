const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1 * 1000

const getCurrentTime = () => {
  const time = new Date().getTime()
  return time
}

module.exports = {
  getCurrentTime,
  ONE_HOUR_IN_MILLISECONDS
}