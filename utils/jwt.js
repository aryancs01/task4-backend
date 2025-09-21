const jwt = require("jsonwebtoken");

const createToken = async (userId, userEmail) => {
  const token = await jwt.sign(
    {
      userId: userId,
      userEmail: userEmail,
    },
    process.env.JWT_SECRET
  );
  return token;
};


module.exports = {
  createToken
};
