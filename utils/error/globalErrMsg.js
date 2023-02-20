const messages = {
  invalidInputErr: {
    statusCode: 500,
    message: 'INVALID_INPUT'
  },

  // userErrMsg Start
  keyErr: {
    statusCode: 400,
    message: 'KEY_ERROR',
  },

  invalidEmailErr: {
    statusCode: 400,
    message: 'INVALID_EMAIL',
  },

  noAuthorizationErr: {
    statusCode: 400,
    message: 'NO_AUTHORIZATION'
  },

  invalidAccessTokenErr: {
    statusCode: 400,
    message: 'INVALID_ACCESS_TOKEN'
  },

  invalidPasswordErr: {
    statusCode: 400,
    message: 'INVALID_PASSWORD',
  },

  duplicateEmailErr: {
    statusCode: 400,
    message: 'DUPLICATE_EMAIL',
  },

  encodePasswordErr: {
    statusCode: 400,
    message: 'FAILED_TO_CREATE_HASHED_PASSWORD',
  },

  failedToSignUpErr: {
    statusCode: 400,
    message: 'FAILED_TO_SIGNUP',
  },

  pwCheckErr: {
    statusCode: 400,
    message: 'INVALID_PASSWORD',
  },

  failedToLoginErr: {
    statusCode: 400,
    message: 'FAILED_TO_LOGIN',
  },

  failedToGetAddressErr: {
    statusCode: 400,
    message: 'FAILED_TO_GET_ADDRESS'
  },

  failedToPostAddressErr: {
    statusCode: 400,
    message: 'FAILED_TO_POST_ADDRESS'
  },

  // userErrorMsg End

  // orderErrMsg Start
  emptyAddressErr: {
    statusCode: 400,
    message: 'EMPTY_ADDRESS'
  },

  emptyCartErr: {
    statusCode: 400,
    message: 'EMPTY_CART'
  },

  orderFailedErr: {
    statusCode: 400,
    message: 'FAILED_TO_ORDER'
  },

  pointLessErr: {
    statusCode: 400,
    message: 'POINT_LESS_THAN_PAYMENT_AMOUNT'
  }

  // orderErrMsg End
}

module.exports = messages