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

    res.json({manager,employee});

});

module.exports = adminRouter;


