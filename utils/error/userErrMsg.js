const messages = {
  keyErr: {
    statusCode: 400,
    message: 'KEY_ERROR',
  },

  invalidEmailErr: {
    statusCode: 400,
    message: 'INVALID_EMAIL',
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
  }
}

module.exports = messages
