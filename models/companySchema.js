//const { bool, boolean } = require("joi");
const { string } = require("joi");
const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    require: true,
  },
  companyLocation: {
    type: String,
    require: true,
  },
  companyCity: {
    type: String,
    require: true,
  },
  companyPic: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
companySchema.set("timestamps", true);
module.exports = mongoose.model("company", companySchema);
