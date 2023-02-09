const messages = {
  keyErr: {
    statusCode: 400,
    message: 'KEY_ERROR'
  },

  invalidEmailErr: {
    statusCode: 400,
    message: 'INVALID_EAMIL'
  },

  invalidPasswordErr: {
    statusCode: 400,
    message: 'INVALID_PASSWORD'
  },

  duplicateEmailErr: {
    statusCode: 400,
    message: 'DUPLICATE_EMAIL'
  },

  encodePasswordErr: {
    statusCode: 400,
    message: 'FAILED_TO_CREATE_HASHED_PASSWORD'
  },

  failedToSignUPErr: {
    statusCode: 400,
    message: "FAILED_TO_SIGNUP"
  }
}

module.exports = messages