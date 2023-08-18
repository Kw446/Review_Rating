let express = require("express");

const company = require("../controllers/companyController");
const { userAuthentication } = require("../middlewares/authToken");
const { registerCompanyValidation,} = require("../vaildation/company/companyValData");
const { upload } = require("../middlewares/companyImageStorage");

let companyRouter = express.Router();

companyRouter.post("/create",upload.single("companyPic"),userAuthentication,registerCompanyValidation,company.createCompany);
companyRouter.get("/list", company.companyList);
companyRouter.get("/review/:id", company.companyDetail);
companyRouter.get("/search/:letter", company.companySearch);
companyRouter.get("/sort", company.companySort);

module.exports = companyRouter;
