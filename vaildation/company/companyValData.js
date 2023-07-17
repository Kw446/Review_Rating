const companyValSchema = require("./companyvalSchema");
const schema = require("./companyvalSchema");
const { unlinkSync } = require("fs");

module.exports = {
  registerCompanyValidation: async (req, res, next) => {
    const value = await schema.registerCompany.validate(req.body, {
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
};
