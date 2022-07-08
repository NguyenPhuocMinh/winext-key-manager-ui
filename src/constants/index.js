const constants = {
  STATUS: {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    ACCESS_DENIED: 403,
    METHOD_NOT_ALLOW: 405,
    DUPLICATE: 409,
    INTERNAL_SERVER: 500
  },
  SORT_DEFAULT: 'createdAt',
  SORT_ORDER: 'desc',
  KEY_SIZE_DEFAULT: '2048',
  ALGORITHM_DEFAULT: 'RS256',
  USE_FOR_DEFAULT: 'SIGN'
};

export default constants;
