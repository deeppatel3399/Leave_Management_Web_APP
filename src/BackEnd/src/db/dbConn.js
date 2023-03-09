const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/",{
    useNewUrlParser: true,
})
.then(()=>{
   console.log("Database Connection Succefully");
})
.catch((err)=>{
    console.log("Database Not Connected");
    console.log(err);
});