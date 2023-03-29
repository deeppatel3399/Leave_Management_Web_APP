const express = require("express");
const adminRouter = express.Router();
const mongoose = require("mongoose");
const Manager = mongoose.model("managerdata");
const User = mongoose.model("userdata");
const UserLeave = mongoose.model("LeaveList");


adminRouter.get("/leaves",async(_,res)=>{

    const leaves = await UserLeave.find({}).populate('employId', "fname lname")
    res.json(leaves);

});

adminRouter.get("/admindash",async(_,res)=>{

    const manager = await Manager.find({});
    const employee = await User.find({});
    const leaves = await UserLeave.find({}).populate('employId', "fname lname")

    res.json({manager,employee,leaves});

});

adminRouter.post("/updateEmployee",async(req,res)=>{

    const {employId,role,managerId,managerName} = req.body;

    try{

        await User.findByIdAndUpdate({_id:employId},{$set:{
            role,managerId,managerName
        }});
        res.json({data:"Employee Data Update Successfully",status:200});

    }
    catch(err)
    {
        res.json({data:err,status:400});
    }

});

adminRouter.post("/updateManager",async(req,res)=>{

    const {managerDataId,managerId} = req.body;

    try{
        await Manager.findByIdAndUpdate({_id:managerDataId},{$set:{
            managerId
        }});
        res.json({data:"Manager Data Update Successfully",status:200});

    }
    catch(err)
    {
        res.json({data:err,status:400});
    }

});


module.exports = adminRouter;


