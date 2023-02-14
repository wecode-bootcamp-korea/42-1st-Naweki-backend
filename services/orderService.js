const orderDao = require('../models/postDao')

const postOrder = () => {
  orderDao.postOrder()
}

module.exports = {
  postOrder
}