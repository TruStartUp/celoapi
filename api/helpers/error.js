/**
 * @typedef {Object} CustomError.
 * @property {String} error Simple error descriptor.
 * @property {String} msg Detailed error descriptor.
 * @property {Number} code HTTP code.
 * @property {String} detailed When specified relates what triggered the error. This is injected from call.
 */
export const errors = {
  BAD_REQUEST: {
    error: 'Bad request',
    msg: 'The request could not be understood by the server due to malformed syntax.',
    code: 400
  },
  UNAUTHORIZED: {
    error: 'Unauthorized',
    msg: 'Missing or invalid authentication credentials.',
    code: 401
  },
  FORBIDDEN: {
    error: 'Forbidden',
    msg: 'You are not allowed to perform this operation',
    code: 403
  },
  NOT_FOUND: {
    error: 'Not found',
    msg: 'Resource not found',
    code: 404
  },
  CONFLICT: {
    error: 'Conflict',
    msg: 'Request could not be processed because of conflict with the request',
    code: 409
  },
  INTERNAL_SERVER_ERROR: {
    error: 'Internal server error',
    msg: 'The server encountered an unexpected condition',
    code: 500
  },
  BAD_GATEWAY: {
    error: 'Bad gateway',
    msg: 'While acting as a gateway or proxy, received an invalid response from the upstream server',
    code: 502
  },
  SERVICE_UNAVAILABLE: {
    error: 'Service Unavailable',
    msg: 'The server is currently unavailable',
    code: 503
  },
  GATEWAY_TIMEOUT: {
    error: 'Gateway Timeout',
    msg: 'While acting as a gateway or proxy, did not receive a timely response from the upstream server',
    code: 504
  },
};

/**
 * Returns a detailed error object
 * @param {Error} code Error code, found in this archive.
 * @param {String} detailed Custom Message
 * @returns {CustomError}
 */
export const error = (code, detailed = null) => {
  if (detailed)
    return {...code, detailed};
  return code;
};
