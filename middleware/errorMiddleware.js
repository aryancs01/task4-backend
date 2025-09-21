const sendResponse = require("../utils/response")

const errorMiddleware = (err, req, res, next) => {
    console.log(err)
    return sendResponse(res,false,404,"Internal Server Error")
}

module.exports = errorMiddleware;