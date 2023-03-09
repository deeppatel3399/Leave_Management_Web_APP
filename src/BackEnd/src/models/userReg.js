const mongoose = require("mongoose");

const userReg = new mongoose.Schema(
    {
    fname : String,
    lname : String,
    email : {type: String,unique: true},
    password : String,
    },
    {
        collection: "userdata",
    }
);

mongoose.model("userdata",userReg);

