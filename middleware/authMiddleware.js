const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");

const authMiddleware = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];

    if (!headers || !headers.startsWith("Bearer")) {
      return sendResponse(res, 403, false, "Not Authorized");
    }

    const token = headers.split(" ")[1];
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload
    next();
  } catch (error) {
    return sendResponse(res, 403, false, "Invalid token");
  }
};

module.exports = authMiddleware;
