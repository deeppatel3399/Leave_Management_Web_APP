const mongoose = require("mongoose");

const managerReg = new mongoose.Schema(
    {
    fname : {type:String,require:true},
    lname : {type:String,require:true},
    email : {type:String,require:true,unique:true},
    password : {type:String,require:true},
    role:{type:String,require:true,enum:["E","M"]},
    managerId:{type:String,require:true,unique:true},
    },
    {
        collection: "managerdata",
    }
);

mongoose.model("managerdata",managerReg);

