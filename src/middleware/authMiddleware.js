const jwt = require('jsonwebtoken');

const HTTP_UNAUTHORIZED = 401;
const UNAUTHORIZED_MESSAGE = 'Unauthorized';

const generateErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

exports.authenticate = (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
      return generateErrorResponse(res, HTTP_UNAUTHORIZED, UNAUTHORIZED_MESSAGE);
    }

    const [bearer, token] = authorizationHeader.split(" ");
    if (bearer !== 'Bearer' || !token) {
      return generateErrorResponse(res, HTTP_UNAUTHORIZED, UNAUTHORIZED_MESSAGE);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return generateErrorResponse(res, HTTP_UNAUTHORIZED, UNAUTHORIZED_MESSAGE);
  }
};
