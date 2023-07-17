const reviewValSchema = require("./reviewValScehma");
const schema = require("./reviewValScehma");

module.exports = {
  createReviewValidation: async (req, res, next) => {
    const value = await reviewValSchema.createReview.validate(req.body, {
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
