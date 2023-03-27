const express = require("express");
const managerRouter = express.Router();
const mongoose = require("mongoose");
const Manager = mongoose.model("managerdata");
const User = mongoose.model("userdata");
const UserLeave = mongoose.model("LeaveList");
const jwt = require("jsonwebtoken");
const jwtKey = "mkshuu7syixg78teyhP{pkxhue7xe8yhui{}jihz83767hgygFuvux][[]isxuhbxy5$#$%gxhguyx";


managerRouter.post("/managerdata",async (req,res)=>{
 
    const {token} = req.body;

    try{
        const verfiyManager = jwt.verify(token,jwtKey);

        const verifyMangerEmail = verfiyManager.email;

        Manager.findOne({email:verifyMangerEmail,role:'M'}).then((data)=>{
            res.json({status:200,data:data});
        }).catch((err)=>{
            res.json({error:"Erro",data:err});
        })
    }
    catch(err){
      return res.json({data:"Token Expired",status:498});
    }
});

managerRouter.post("/allemploy",async(req,res)=>{
  
    const{managerId} = req.body;

    try
    {
        const employData = await User.find({managerId});

        return res.json({data:employData,status:200});

    }
    catch(err)
    {
        res.json({data:'Data Not Fetch',status:400});
    }

});

managerRouter.post("/leavedata",async(req,res)=>{

    const {employId} = req.body;

    try
    {
        const leavesData = await UserLeave.find({employId});

        if(leavesData)
        {
            return res.json({data:leavesData,status:200});
        }
        else
        {
            res.json({data:"can't fetch leave data",status:404});
        }

    }
    catch(err)
    {
        res.json({data:err,status:400});
    }


});

module.exports = managerRouter;
