const { date } = require("joi");
const companyReviewSchema = require("../models/companyReviewSchema");

const createReview = async (req, res) => {
  const reviewData = new companyReviewSchema(req.body);
  try {
    await reviewData.save();
    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: reviewData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};


//................updateReview api...........................

let updateReview = async (req, res) => {
  const reviewID = req.params.id;
  try {
    let updatedCompanyReview = await companyReviewSchema.findByIdAndUpdate(
      reviewID,
      req.body,
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Review updated  successfully",
      updatedReview: updatedCompanyReview,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
    });
  }
};

//....................delete Review Api.................................................
let deleteReview = async (req, res) => {
  let reviewID = req.params.id;
  try {
    let deleteReview = await companyReviewSchema.findByIdAndDelete(
      reviewID,
      req.body
    );
    res.status(202).send({
      success: true,
      message: " Review deleted successfully",
      deletedReview: deleteReview,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error,
    });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
