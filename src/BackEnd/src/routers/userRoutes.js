const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = "mkshuu7syixg78teyhP{pkxhue7xe8yhui{}jihz83767hgygFuvux][[]isxuhbxy5$#$%gxhguyx";
const mongoose = require("mongoose");
const User = mongoose.model("userdata");
const UserLeave = mongoose.model("LeaveList");
const Manager = mongoose.model("managerdata");

 userRouter.post("/userdata",async (req,res)=>{
 
     const {token} = req.body;
 
     try{
         const verfiyUser = jwt.verify(token,jwtKey);
 
         const verifyUserEmail = verfiyUser.email;

         const role = verfiyUser.role;
    
         if(role==="E")
         {
            User.findOne({email:verifyUserEmail,role:"E"}).then((data)=>{
                res.json({status:200,data:data});
            }).catch((err)=>{
                res.json({error:"Erro",data:err});
            })
         }
         else if(role==="M")
         {
            Manager.findOne({email:verifyUserEmail,role:"M"}).then((data)=>{
                res.json({status:200,data:data});
            }).catch((err)=>{
                res.json({error:"Erro",data:err});
            })
         }
 
     }
     catch(err){
       return res.json({data:"Token Expired",status:498});
     }
 });
 
 userRouter.post("/leavereq",async(req,res)=>{

    const {token,employId,fromDate,toDate,typeOfLeave,days,note} = req.body;

    try{

        const verifyUser = jwt.verify(token,jwtKey);

        const role = verifyUser.role;

        const email = verifyUser.email;

        let name;

        if(role==='E')
        {
          const emp = await User.findOne({email});
          name = emp.fname+" "+emp.lname;
        }
        else if(role==='M')
        {
            const man = await Manager.findOne({email});
            name = man.fname+" "+man.lname;
        }

        const leaveOnSameDate = await UserLeave.findOne({employId,
            $or:[{fromDate:{$gte:fromDate, $lte:toDate}},
                {toDate:{$gte:fromDate, $lte:toDate}},
                {$and:[{fromDate:{$lte:fromDate}}, {toDate:{$gte:toDate}}]},],
            $nor:[{status:"R"}, {status:"C"}],});
            if(leaveOnSameDate)
            {
                 return res.send({message: "Leave can't be applied for same days twice.",status: 409,})
            }
            await UserLeave.create({
                employId,fromDate,toDate,typeOfLeave,days,note,role,name
            })
            .then(async()=>{

                if(role==="E")
                {
                    const existUser = await User.findOne({_id:employId});
                    const currentLeaveDays = existUser.remainingLeaveDays-days;
    
                    await User.findOneAndUpdate({_id:employId},{$set:{
                        remainingLeaveDays:currentLeaveDays
                    }})
                }
                else if(role==="M")
                {
                    const existUser = await Manager.findOne({_id:employId});
                    const currentLeaveDays = existUser.remainingLeaveDays-days;
    
                    await Manager.findOneAndUpdate({_id:employId},{$set:{
                        remainingLeaveDays:currentLeaveDays
                    }})
                }

                res.json({data:"Leave Apply Successfully And update leave",status:200});
            })    
        // }
    }
    catch(err)
    {
     console.log(err);
     res.json({data:err,status:400});
    }
 });

 userRouter.post("/leavestatus",async(req,res)=>{

    const {token} = req.body;

    try{
        const verfiyUser = jwt.verify(token,jwtKey);

        const verifyUserEmail = verfiyUser.email;

        const role = verfiyUser.role;

        let user;

        if(role==='E')
        {
            user = await User.findOne({email:verifyUserEmail,role:"E"});

        }
        else if(role==='M')
        {
            user = await Manager.findOne({email:verifyUserEmail,role:"M"});

        }

        const leaveReqData  = await UserLeave.find({employId:user._id});
        
        if(leaveReqData)
        {
           res.json({status:200,data:leaveReqData});
        }
        else
        {
            res.json({data:"not fetch",status:400});
        }

    }
    catch(err){
      return res.json({data:err,status:400});
    }

 });

module.exports = userRouter;
