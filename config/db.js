const mongoose = require("mongoose");

function mongooseConnect() {
  mongoose
    .connect(process.env.PROD_DATABASE_URL)
    .then(() => {
      console.log("Database connected...");
    })
    .catch(() => {
      console.log("error while connecting database");
    });
}

module.exports = mongooseConnect;
