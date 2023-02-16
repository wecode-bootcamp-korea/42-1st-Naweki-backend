const camelToSnakeCase = str => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

const isEmpty = (obj) => {
  return Object.keys(obj).length == 0
}

module.exports = {
  camelToSnakeCase,
  isEmpty
}