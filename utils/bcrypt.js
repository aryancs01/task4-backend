const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password,5);
    return hashedPassword
}

const comparePassword =  async (userPassword, encryptedPassword) => {
    const isCorrect = await bcrypt.compare(userPassword,encryptedPassword);
    return isCorrect;
}

module.exports = {
    hashPassword,
    comparePassword
}