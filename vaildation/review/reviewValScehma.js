const joi = require("joi");

const reviewValSchema = {
  createReview: joi
    .object({
      subject: joi
        .string()
        .min(3)
        .max(20)
        .message({
          "string.min": "{#label} sholud contain at least {#limit} charachter",
          "string.max": "{#label} sholud contain at least {#limit} charachter",
        })
        .required(),

      review: joi
        .string()
        .min(10)
        .max(100)
        .message({
          "string.min": "{#label} should contain at least {#limit} charachter",
          "string.max": "{#label} should contain at least {#limit} charachter",
        })
        .required(),
      rating: joi.string().required(),
    })
    .unknown(true),
};


module.exports = reviewValSchema;
