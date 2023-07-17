const companyReviewSchema = require("../models/companyReviewSchema");
const companySchema = require("../models/companySchema");
const { unlinkSync } = require("fs");
const { search } = require("../routes/userRoutes");

module.exports = {
  createCompany: async (req, res) => {
    const companyData = new companySchema(req.body);
    try {
      let isComanyExit = await companySchema.findOne({
        companyName: req.body.companyName,
      });
      if (isComanyExit) {
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: "company is all ready exitst",
        });
      } else {
        const filePath = `/uploads/companyImage/${req.file.filename}`;
        companyData.companyPic = filePath;
        let company = await companyData.save();
        res.status(201).json({
          success: true,
          message: "comapny created succfully ",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  companyList: async (req, res) => {
    try {
      const companyList = await companySchema.find();
      const totalComapny = await companySchema.find().count();
      res.status(200).json({
        success: true,
        message: "all company founded succefully",
        count: totalComapny,
        companies: companyList,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  companyDetail: async (req, res) => {
    try {
      const companyData = await companySchema.findById(req.params.id);
      const reviewDataList = await companyReviewSchema
        .find({ companyId: req.params.id })
        .populate({ path: "userId", select: "userName  profilePic" });
      res.status(200).json({
        success: true,
        message: "all  deatils of review are fatched successfully",
        company: companyData,
        review: reviewDataList,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: `review not found${error.message}`,
      });
    }
  },

  companySearch: async (req, res) => {
    const { letter } = req.params;
    try {
      const companies = await companySchema.find({
        companyName: { $regex: `^${letter}`, $options: "i" },
      });
      if (companies.length > 0) {
        res.status(200).json({
          success: true,
          message: "all  deatils of company show successfully",
          companies: companies,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "  company not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `company not found${error.message}`,
      });
    }
  },

  companySort: async (req, res) => {
    try {
      const companyData = await companySchema
        .find(req.params.id)
        .sort("companyName");
      res.status(200).json({
        success: true,
        message: "all  deatils sort fatched successfully",
        sort: companyData,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: `error in ${error.message}`,
      });
    }
  },
};
