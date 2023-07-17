let express = require("express");
let user = require("../controllers/userController");
let {
  registerUserValidation,
  logInUserValidation,
  resetPassword,
} = require("../vaildation/user/userValData");
const { userAuthentication } = require("../middlewares/authToken");
const { upload } = require("../middlewares/imageStorage");
let router = express.Router();

router.post("/create", upload.single("profilePic"), user.createUser);
router.post("/login", logInUserValidation, user.userLogin);
router.get("/check", userAuthentication, user.checktoken);
router.post("/sendemail", user.sendEmail);
router.post(
  "/resetuserpassword/:id/:token",
  resetPassword,
  user.resetUserpassword
);
module.exports = router;
