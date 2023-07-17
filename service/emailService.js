const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.USER_PASS,
  },
});
const mailOption = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: "hello deepak you are selected in  testing  company",
  text: "your packege is 67 lpa per year.",
};

module.exports = {
  transporter,
  mailOption,
};
