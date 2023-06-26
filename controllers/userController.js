const { response } = require("express")

let userSchema=require('../models/userSchema')

let createUser= async(req,res)=>{
console.log(req.body)

const userData= new userSchema(req.body);
try{

    const isUserExit = await userSchema.findOne({
        userEmail:req.body.userEmail,
    });
    if(isUserExit){
        res.status(401).json({
            success:false,
            message:"user is alrdy exit with this email",
        });

    }else{

        const user = await userData.save();
        res.status(201).json({
            success:true,
            message:"user is successfulyy registered",
            user:user,
        });
    }
} catch(error){
    res.status(500).json({
        success:false,
        message:`error occur${error.message}`,
    });
}
}
module.exports={
    createUser
}