const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");
const { transporter } = require("../service/emailService");
const { unlinkSync } = require("fs");

//..............create api..........................
let createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const userData = new userSchema(req.body);
  try {
    const isUserExit = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExit) {
      req.file ? unlinkSync(req.file.path) : null;
      res.status(401).json({
        success: false,
        message: "User is already exist with this email",
      });
    } else {
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      const filePath = `/uploads/userImage/${req.file.filename}`;
      userData.profilePic = filePath;

      //.......trim..............
      userData.userName = req.body.userName
        .trim()
        .split(" ")
        .map((data) => {
          return data.charAt(0).toUpperCase() + data.slice(1);
        })
        .join(" ");
      const user = await userData.save();
      res.status(201).json({
        success: true,
        message: "User is successfully registered",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Eror occur${error.message}`,
    });
  }
};

//................login api............................

const userLogin = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(201).json({
          success: true,
          message: "login successfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "User is not regeisterd with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error ocure ${error.message}`,
    });
  }
};

//.......... check token api ................
let checktoken = (req, res) => {
  res.send(" Your token is valld");
};

//.........sendEmail for rest password Api............

const sendEmail = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData != null) {
      const secret = userData._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });
      const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
      const info = await transporter.sendMail({
        from: "kaustubhwani446@gmail.com",
        to: userEmail,
        subject: "Email for user reset password",
        html: `<a href=${link}> click on this for reset password`,
      });
      return res.status(201).json({
        success: true,
        message: "Email send successfully",
        token: token,
        userID: userData._id,
      });
    } else {
      res.status(403).json({
        success: false,
        error: "Please enter valid email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occure${error.message}`,
    });
  }
};

//.........................Reset API.........................................

const resetUserpassword = async (req, res) => {
  const { id, token } = req.params;
  let { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await userSchema.findById(id);
    if (checkUser != null) {
      const secretKey = checkUser._id + process.env.SECRET_KEY;
      jwt.verify(token, secretKey);
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const bcryptpassword = await bcrypt.hash(confirmPassword, salt);
        await userSchema.findByIdAndUpdate(checkUser._id, {
          $set: { userPassword: bcryptpassword },
        });
        res.status(200).json({
          success: true,
          message: "password change successfully",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Reset password and confirm password  not matched",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: " User email not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
  userLogin,
  checktoken,
  sendEmail,
  resetUserpassword,
};
