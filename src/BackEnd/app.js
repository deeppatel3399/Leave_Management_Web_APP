const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

require("./src/db/dbConn");
require("./src/models/userReg");

app.listen(3001,()=>{
    console.log("Server Start on 3001");
});

const User = mongoose.model("userdata");
const jwtKey = "mkshuu7syixg78teyhP{pkxhue7xe8yhui{}jihz83767hgygFuvux][[]isxuhbxy5$#$%gxhguyx";

app.post("/register",async (req,res)=>{

    const {fname,lname,email,password} = req.body;

    const encryptPass = await bcrypt.hash(password,10);

    try{

       const existUser = await User.findOne({email});

       if(existUser)
       {
        return res.json({error:"User Already Exist!...",status:208});
       }

        await User.create({
            fname,lname,email,password:encryptPass
        });
        res.json({data:'Insert Data Succefully',status:201});

    }
    catch(err)
    {
      res.json({error:"Not Inserted",status:406})
    }
    
});

app.post("/login",async (req,res)=>{

   const {email,password} = req.body;

   const existUser = await User.findOne({email});

   if(!existUser)
   {
    return res.json({error:"Invalid Credentials",status:404});
   }

   if(await bcrypt.compare(password,existUser.password))
   {
    const jwtToken = jwt.sign({email:existUser.email},jwtKey);

    if(res.status(201))
    {
        return res.json({token:jwtToken,status:200});
    }
    else
    {
        return res.json({error:"Invalid Credentials",status:404});
    }
   }
   res.json({error:"Invalid Credentials",status:404});
});

app.post("/userdata",async (req,res)=>{

    const {token} = req.body;

    try{
        const verfiyUser = jwt.verify(token,jwtKey);

        const verifyUserEmail = verfiyUser.email;

        User.findOne({email:verifyUserEmail}).then((data)=>{
            res.json({status:200,data:data});
        }).catch((err)=>{
            res.send({error:"Erro",data:err});
        })
    }
    catch(err){
       res.send({data:err});
    }
});