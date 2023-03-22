const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = "mkshuu7syixg78teyhP{pkxhue7xe8yhui{}jihz83767hgygFuvux][[]isxuhbxy5$#$%gxhguyx";


const mongoose = require("mongoose");
const User = mongoose.model("userdata");
const UserLeave = mongoose.model("LeaveList");
const Manager = mongoose.model("managerdata");
const superAdmin = mongoose.model("superAdmin");


router.post("/register",async (req,res)=>{

    const {fname,lname,email,password,role,managerId,managerName} = req.body;

    const encryptPass = await bcrypt.hash(password,10);

    try{

        if(role==="E")
        {

         const existUser = await User.findOne({email});

        if(existUser)
        {
            res.json({error:"User Already Exist!...",status:208});
        }
        else
        {
            const findManagerId = await Manager.findOne({managerId});
            if(findManagerId)
            {
            await User.create({
                fname,lname,email,password:encryptPass,role,managerId,managerName
            });
            res.json({data:'Employ Insert Data Succefully',status:201});
            }
            else
            {
              res.json({data:"ManagerId not exist....!",status:404});
            }
        }
       }

       else if(role==="M")
       {
        const existManager = await Manager.findOne({email});

        if(existManager)
        {
          res.json({error:"Manager Already Exist!...",status:208});
        }
        else
        {
            await Manager.create({
                fname,lname,email,password:encryptPass,role,managerId
            });
            res.json({data:'Manager Insert Data Succefully',status:201});
        }
       }

    }
    catch(err)
    {
      res.json({error:err,status:406})
    }
    
});

router.post("/login",async (req,res)=>{

    const {email,password} = req.body;
 
    const existUser = await User.findOne({email});
    const existManager = await Manager.findOne({email});
    const existSuperAdmin = await superAdmin.findOne({email});

    if(existUser)
    {
        if(await bcrypt.compare(password,existUser.password))
        {
         const jwtToken = jwt.sign({email:existUser.email},jwtKey,{expiresIn:86400});
     
         if(res.status(201))
         {
             return res.json({token:jwtToken,status:200,role:existUser.role});
         }
         else
         {
             return res.json({error:"Invalid Credentials",status:404});
         }
        }
    }
    else if(existManager)
    {
        if(await bcrypt.compare(password,existManager.password))
        {
         const jwtToken = jwt.sign({email:existManager.email},jwtKey,{expiresIn:86400});
     
         if(res.status(201))
         {
             return res.json({token:jwtToken,status:200,role:existManager.role});
         }
         else
         {
             return res.json({error:"Invalid Credentials",status:404});
         }
        }
    }
    else if(existSuperAdmin)
    {
        if(password===existSuperAdmin.password)
        {
         const jwtToken = jwt.sign({email:existSuperAdmin.email},jwtKey,{expiresIn:86400});
     
         if(res.status(201))
         {
             return res.json({token:jwtToken,status:200,role:existSuperAdmin.role});
         }
         else
         {
             return res.json({error:"Invalid Credentials",status:404});
         }
        }
    }
    else
    {
        res.json({error:"Invalid Credentials",status:404});
    }
    res.json({data:"Invalid Credentials",status:404});
 
 });
 
 router.post("/userdata",async (req,res)=>{
 
     const {token} = req.body;
 
     try{
         const verfiyUser = jwt.verify(token,jwtKey);
 
         const verifyUserEmail = verfiyUser.email;
 
         User.findOne({email:verifyUserEmail}).then((data)=>{
             res.json({status:200,data:data});
         }).catch((err)=>{
             res.json({error:"Erro",data:err});
         })
     }
     catch(err){
       return res.json({data:"Token Expired",status:498});
     }
 });
 
 router.post("/forgotpassword",async (req,res)=>{
 
     const {email} = req.body;
 
     try{
         const existUser = await User.findOne({email});
         const existManager = await Manager.findOne({email});
 
         if(!existUser && !existManager)
         {
             return res.json({data:"Email-Id Not exist",status:404});
         }
         else if(existUser)
         {
             return res.json({data:existUser,status:200});
         }
         else if(existManager)
         {
            return res.json({data:existManager,status:200});
         }
     }
     catch(err){
         res.json({data:err,status:404})
     }
 
 });

 router.post("/resetpassword",async(req,res)=>{
 
    const{email,newPassword} = req.body;

    const existUser = await User.findOne({email});
    const existManager = await Manager.find({email});

    try{
    if(existUser)
    {
            const newEncryptPass = await bcrypt.hash(newPassword,10);

            await User.findOneAndUpdate({email:email},{$set:{
                password:newEncryptPass
            }});

            res.json({data:"Password Update Successfully",status:200});

    }
    else if(existManager)
    {
        const newEncryptPass = await bcrypt.hash(newPassword,10);

        await Manager.findOneAndUpdate({email:email},{$set:{
            password:newEncryptPass
        }});

        res.json({data:"Password Update Successfully",status:200});
    }
    else
    {
       return res.json({data:"Email-Id Not Found",status:404});
    } 
    }
    catch(err)
    {
        return res.json({data:err,status:400});
    }
});

 router.post("/updatepassword",async(req,res)=>{
 
     const{currentPassword,newPassword,token} = req.body;

     const verfiyUser = jwt.verify(token,jwtKey);
     const email = verfiyUser.email;
 
     const existUser = await User.findOne({email});
     const existManager = await Manager.findOne({email});
 
     try{
     if(existUser)
     {
         const comparepass = await bcrypt.compare(currentPassword,existUser.password);
         if(comparepass===true)
         {
             const newEncryptPass = await bcrypt.hash(newPassword,10);
 
             await User.findOneAndUpdate({email:email},{$set:{
                 password:newEncryptPass
             }});
 
             res.json({data:"Password Update Successfully",status:200});
         }
         else
         {
             res.json({data:"Password Not Match",status:404});
         }
     }
     else if(existManager)
     {
        const comparepass = await bcrypt.compare(currentPassword,existManager.password);
        if(comparepass===true)
        {
            const newEncryptPass = await bcrypt.hash(newPassword,10);

            await Manager.findOneAndUpdate({email:email},{$set:{
                password:newEncryptPass
            }});

            res.json({data:"Password Update Successfully",status:200});
        }
        else
        {
            res.json({data:"Password Not Match",status:404});
        }
     }
     else
     {
        return res.json({data:"Email-Id Not Found",status:404});
     } 
     }
     catch(err)
     {
         return res.json({data:err,status:400});
     }
 });

 router.post("/leavereq",async(req,res)=>{

    const {employId,fromDate,toDate,typeOfLeave,days,note} = req.body;

    try{

        const leaveOnSameDate = await UserLeave.findOne({employId,
            $or:[{fromDate:{$gte:fromDate, $lte:toDate}},
                {toDate:{$gte:fromDate, $lte:toDate}},
                {$and:[{fromDate:{$lte:fromDate}}, {toDate:{$gte:toDate}}]},],
            $nor:[{status:"R"}, {status:"C"}],});
            if(leaveOnSameDate)
            {
                 return res.send({message: "Leave can't be applied for same days twice.",status: 409,})
            }

        // const verifyUser = await UserLeave.findOne({employId});

        // if(verifyUser)
        // {
        //     if(new Date(verifyUser.toDate).toLocaleDateString("in-en")<fromDate)
        //     {
        //         await UserLeave.create({
        //             employId,fromDate,toDate,typeOfLeave,days,note
        //         })
        //         .then(async()=>{

        //             const existUser = await User.findOne({_id:employId});
        //             const currentLeaveDays = existUser.remainingLeaveDays-days;

        //             await User.findOneAndUpdate({_id:employId},{$set:{
        //                 remainingLeaveDays:currentLeaveDays
        //             }})
        //             return res.json({data:"Leave Apply Successfully And update leave",status:200});
        //         }) 
        //     }
        //     else
        //     {
        //         res.json({data:"Leave Already Applied",status:409});
        //     }
        // }
        // else
        // {
            await UserLeave.create({
                employId,fromDate,toDate,typeOfLeave,days,note
            })
            .then(async()=>{

                const existUser = await User.findOne({_id:employId});
                const currentLeaveDays = existUser.remainingLeaveDays-days;

                await User.findOneAndUpdate({_id:employId},{$set:{
                    remainingLeaveDays:currentLeaveDays
                }})
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

 router.post("/leavestatus",async(req,res)=>{

    const {token} = req.body;

    try{
        const verfiyUser = jwt.verify(token,jwtKey);

        const verifyUserEmail = verfiyUser.email;

        const employ = await User.findOne({email:verifyUserEmail});

        const leaveReqData  = await UserLeave.find({employId:employ._id});
        
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

router.post("/managerdata",async (req,res)=>{
 
    const {token} = req.body;

    try{
        const verfiyManager = jwt.verify(token,jwtKey);

        const verifyMangerEmail = verfiyManager.email;

        Manager.findOne({email:verifyMangerEmail}).then((data)=>{
            res.json({status:200,data:data});
        }).catch((err)=>{
            res.json({error:"Erro",data:err});
        })
    }
    catch(err){
      return res.json({data:"Token Expired",status:498});
    }
});

router.post("/allemploy",async(req,res)=>{
  
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

router.post("/leavedata",async(req,res)=>{

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

router.post('/acceptupdateleave',async(req,res)=>{

    const{leaveId,status,managerNote} = req.body;

    try{

      await UserLeave.findByIdAndUpdate({_id:leaveId},{$set:{
             status,managerNote
      }}).then(()=>{
        return res.json({data:'Leave Update Successfully',status:200});
      })
    }
    catch(err){
         res.json({data:err,status:400});
    }
});

router.post('/rejectupdateleave',async(req,res)=>{

    const{leaveId,employId,status,managerNote,days} = req.body;

    try{

      await UserLeave.findByIdAndUpdate({_id:leaveId},{$set:{
             status,managerNote
      }}).then(async()=>{

        const currentDays = await User.findOne({_id:employId});
        const actualDays = currentDays.remainingLeaveDays+days;

        await User.findByIdAndUpdate({_id:employId},{$set:{
            remainingLeaveDays:actualDays
        }})
         return res.json({data:'Leave Update Successfully',status:200});
      })
    }
    catch(err){
         res.json({data:err,status:400});
    }
});

router.get("/admin/leaves",async(_,res)=>{

    const leaves = await UserLeave.find({}).populate('employId', "fname lname")
    res.json(leaves);

});

module.exports = router;
