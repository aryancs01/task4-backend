require("dotenv").config()
const express = require("express")
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const mongooseConnect = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");
const PORT = process.env.PORT
const app = express();

app.use(cors())

app.use(express.json())
app.use(errorMiddleware)

mongooseConnect()

app.use("/api/v1/user",userRouter);

app.listen(PORT,()=>{
    console.log(`Listening on Port ${PORT}`)
})