const { signup, signin } = require("../controllers/user/authControllers");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter = require("express").Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/auth",authMiddleware,(req,res)=>{
    res.send(req.user)
})

module.exports = userRouter;
