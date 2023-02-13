const getCurrentTime = () => {
  const time = new Date().getTime() + (60 * 60 * 24)
  return time
}

module.exports = {
  getCurrentTime
}