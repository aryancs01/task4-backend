const userModel = require("../../models/userModel");
const { hashPassword, comparePassword } = require("../../utils/bcrypt");
const sendResponse = require("../../utils/response");
const { signupSchema, loginSchema } = require("../../utils/validations");
const { createToken } = require("../../utils/jwt");

const signup = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = signupSchema.validate(body);

    if (error) {
      return sendResponse(res, 401, false, "Format is incorrect");
    }

    const { name, email, password } = value;

    const userPresent = await userModel.findOne({
      email: email,
    });

    if (userPresent) {
      return sendResponse(res, 200, true, "User Already Signup!");
    }

    const hashedPassword = await hashPassword(password);

    const createUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return sendResponse(res, 200, true, "User Signup!", {
      name: createUser.name,
      email: createUser.email,
    });
  } catch (error) {
    return sendResponse(res, 404, false, "Something went wrong");
  }
};

const signin = async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    const { error, value } = loginSchema.validate(body);

    if (error) {
      return sendResponse(res, 401, false, "Format is incorrect");
    }

    const { email, password } = value;

    console.log(value)

    const userPresent = await userModel.findOne({
      email: email,
    });

    console.log(userPresent)

    if (!userPresent) {
      return sendResponse(res, 403, false, "User Not Signup!");
    }

    const isPasswordCorrect = await comparePassword(password, userPresent.password)

    console.log(isPasswordCorrect)

    if(!isPasswordCorrect){
        return sendResponse(res, 403, false, "User Not Authorized!");
    }

    const token = await createToken(userPresent._id,userPresent.email);

    console.log(token)

    return sendResponse(res, 200, true, "User signin",token);

  } catch (error) {
    return sendResponse(res, 404, false, "Something went wrong");
  }
};

module.exports = {
    signup,
    signin
};
