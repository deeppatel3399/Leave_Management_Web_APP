const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        superId:{type:String,required:true,unique:true},
        role:{type:String,required:true,enum:["SA"],default:"SA"},
    },
    {
        collection:"superAdmin"
    }
);

mongoose.model("superAdmin",superAdminSchema);
