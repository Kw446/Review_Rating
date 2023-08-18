let express = require("express");
let user = require("../controllers/userController");
let {registerUserValidation,logInUserValidation,resetPassword,} = require("../vaildation/user/userValData");

const { userAuthentication } = require("../middlewares/authToken");
const { upload } = require("../middlewares/imageStorage");
let userRouter = express.Router();


userRouter.post("/create", upload.single("profilePic"),registerUserValidation, user.createUser);
userRouter.post("/login", logInUserValidation, user.userLogin);
userRouter.get("/check", userAuthentication, user.checktoken);
userRouter.post("/sendemail", user.sendEmail);
userRouter.post("/resetuserpassword/:id/:token",resetPassword,user.resetUserpassword);
module.exports =userRouter;
  