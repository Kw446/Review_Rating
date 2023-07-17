const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const userSchema = {
  registerUser: joi
    .object({
      userName: joi
        .string()
        .min(3)
        .max(20)
        .message({
          "string.min": "{#label} sholud contain at least {#limit} charachter",
          "string.max": "{#label} sholud contain at least {#limit} charachter",
        })
        .required(),
      userEmail: joi
        .string()
        .email()
        .message("Invalid email adrees")
        .required(),
      userPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required()
        .messages({
          "userPassword.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "userPassword.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "userPassword.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "userPassword.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "userPassword.noWhiteSpaces":
            "{#label} should not contain white spaces",
          "userPassword.onlyLatinCharacters":
            "{#label} should contain only latin characters",
        }),

      userPhone: joi
        .number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .message("Invalid mobill number")
        .required(),
      userCity: joi.string().required(),
      userState: joi.string().required(),
    })
    .unknown(true),

  loginUser: joi
    .object({
      userEmail: joi
        .string()
        .email()
        .message("Invalid email adrees")
        .required(),
      userPassword: joi.string().required(),
    })
    .unknown(true),


  // reset validation
  resetPassword: joi.object({
    newPassword: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .messages({
        "userPassword.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "userPassword.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "userPassword.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "userPassword.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "userPassword.noWhiteSpaces":
          "{#label} should not contain white spaces",
        "userPassword.onlyLatinCharacters":
          "{#label} should contain only latin characters",
      }),

    confirmPassword: joiPassword
      .string()
      .messages({ "enter password": "Inavlid password" })
      .required()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .messages({
        "userPassword.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "userPassword.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "userPassword.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "userPassword.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "userPassword.noWhiteSpaces":
          "{#label} should not contain white spaces",
        "userPassword.onlyLatinCharacters":
          "{#label} should contain only latin characters",
      }),
  }),
};


module.exports = {
  userSchema,
};
