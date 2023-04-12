const express = require("express");

const commonRouter = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = "mkshuu7syixg78teyhP{pkxhue7xe8yhui{}jihz83767hgygFuvux][[]isxuhbxy5$#$%gxhguyx";


const mongoose = require("mongoose");
const User = mongoose.model("userdata");
const Manager = mongoose.model("managerdata");
const superAdmin = mongoose.model("superAdmin");

commonRouter.post("/register",async (req,res)=>{

    const {fname,lname,email,password,role,managerId,managerName,superManagerId} = req.body;

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
                fname,lname,email,password:encryptPass,role,managerId,superManagerId
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

commonRouter.post("/login",async (req,res)=>{

    const {email,password} = req.body;
 
    const existUser = await User.findOne({email});
    const existManager = await Manager.findOne({email});
    const existSuperAdmin = await superAdmin.findOne({email});

    if(existUser)
    {
        if(await bcrypt.compare(password,existUser.password))
        {
         const jwtToken = jwt.sign({email:existUser.email,role:existUser.role},jwtKey,{expiresIn:86400});
     
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
         const jwtToken = jwt.sign({email:existManager.email,role:existManager.role},jwtKey,{expiresIn:86400});
     
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
         const jwtToken = jwt.sign({email:existSuperAdmin.email,role:existSuperAdmin.role},jwtKey,{expiresIn:86400});
     
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
        return res.json({error:"Invalid Credentials",status:404});
    }
    res.json({data:"Invalid Credentials",status:404});
 
});

commonRouter.post("/forgotpassword",async (req,res)=>{
 
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

commonRouter.post("/resetpassword",async(req,res)=>{

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

commonRouter.post("/updatepassword",async(req,res)=>{

    const{currentPassword,newPassword,token} = req.body;

    const verfiyUser = jwt.verify(token,jwtKey);
    const email = verfiyUser.email;
    const role = verfiyUser.role;

    const existUser = await User.findOne({email});
    const existManager = await Manager.findOne({email});

    try{
    if(existUser && role==="E")
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
    else if(existManager && role==="M")
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

module.exports = commonRouter;