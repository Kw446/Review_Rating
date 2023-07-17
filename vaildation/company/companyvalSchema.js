const joi = require('joi')

const companyValSchema = {
    registerCompany: joi.object({
        companyName: joi
            .string()
            .min(3)
            .max(20)
            .message({
                "string.min": "{#label} sholud conatain at least {#limit} charachter",
                "string.max": "{#label} sholud conatain at least {#limit} charachter",
            }).required(),

        companyCity: joi
            .string()
            .required(),
        companyLocation: joi
            .string()
            .required()
    }).unknown(true),

}

module.exports = companyValSchema
