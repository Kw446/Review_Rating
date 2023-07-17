const express = require("express");
const userRouter = require("./userRoutes");
const companyRouter = require("./companyRoutes");
const {
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/companyReviewController");
const {
  createReviewValidation,
} = require("../vaildation/review/reviewValData");

let router = express.Router();

router.post("/createreview", createReviewValidation, createReview);
router.patch("/updatereview/:id", updateReview);
router.delete("/deletereview/:id", deleteReview);

module.exports = router;
