const mongoose = require("mongoose");

const userReg = new mongoose.Schema(
    {
    fname : {type:String,require:true},
    lname : {type:String,require:true},
    email : {type:String,require:true,unique:true},
    password : {type:String,require:true},
    role:{type:String,require:true,enum:["E","M"]},
    managerId:{type:String,require:true},
    managerName:String,
    remainingLeaveDays:{type:Number,default:28}
    },
    {
        collection: "userdata",
    }
);

mongoose.model("userdata",userReg);

