const { userSchema } = require("./userValSchema");
const Schema = require("./userValSchema");
const { unlinkSync } = require("fs");

module.exports = {
  registerUserValidation: async (req, res, next) => {
    const value = await userSchema.registerUser.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      req.file ? unlinkSync(req.file.path) : null;
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  logInUserValidation: async (req, res, next) => {
    let value = await userSchema.loginUser.validate(req.body, {
      abortEarly: false,
    });

    if (value.error) {
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  resetPassword: async (req, res, next) => {
    const value = await userSchema.resetPassword.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
