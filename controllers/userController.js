const { response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");
const { transporter } = require("../service/emailService");
const { unlink } = require("../routes/userRoutes");
//const { checkout } = require("../routes/userRoutes");
const { unlinkSync } = require("fs");

let createUser = async (req, res) => {
  console.log(req.body);
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
        message: "user is alrdy exit with this email",
      });
    } else {
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);

      const filePath = `/uploads/userImage/${req.file.filename}`;
      userData.profilePic = filePath;

      //trim
      userData.userName = req.body.userName
        .trim()
        .split(" ")
        .map((data) => {
          return data.charAt(0).toUpperCase() + data.slice(1);
        })
        .join(" ");
      console.log(userData.userName);

      const user = await userData.save();
      res.status(201).json({
        success: true,
        message: "user is successfulyy registered",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error occur${error.message}`,
    });
  }
};


const userLogin = async (req, res) => {
  console.log(req.body);
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
        res.status(200).json({
          success: true,
          message: "login succfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "user is not regeisterd with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error ocure ${error.message}`,
    });
  }
};

//to check token
let checktoken = (req, res) => {
  res.send("hey your token is valld");
};

// user send mail fro rest password

const sendEmail = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    // console.log(" Email user:", userData);
    if (userData != null) {
      const secret = userData._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });

      const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
      const info = await transporter.sendMail({
        from: "kaustubhwani446@gmail.com",
        to: "kaustubhwani446@gmail.com",
        subject: "Email for user reser password",
        text: `<a href=${link}> click on this for reset password`,
      });
      return res.status(201).json({
        success: true,
        message: "Email send succfuly",
        token: userData._id,
        userID: userData._id,
      });
    } else {
      res.status(403).json({
        success: false,
        error: "pls enter valid email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occure${error.message}`,
    });
  }
};

// const resetUserpassword=async(req,res)=>{
//     const{id,token}=req.params;
//     let{newpassword,confirmpassword}=req.body();
// }

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
          message: "password change succfuly",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "password  and confirm, not matched",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "email usser notf found",
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
